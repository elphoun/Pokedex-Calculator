import type {
  PokemonState,
  Move,
  DamageResult,
  FieldConditions,
  PokemonType,
} from "../types";
import { POKEMON_DATA } from "../utils";

// Calculate type effectiveness
function getTypeEffectiveness(
  moveType: PokemonType,
  defenderTypes: readonly [PokemonType, PokemonType | null],
): number {
  let multiplier = 1;
  defenderTypes.forEach((defType) => {
    if (defType) {
      const effectiveness =
        (POKEMON_DATA[moveType]?.effectiveness as Record<string, number>)?.[
          defType
        ] ?? 1;
      multiplier *= effectiveness;
    }
  });
  return multiplier;
}

// Simplified damage calculation formula based on Pokémon damage formula
// This is a mock implementation - real Pokémon damage calc is more complex
export function calculateDamage(
  attacker: PokemonState,
  defender: PokemonState,
  move: Move,
  fieldConditions: FieldConditions,
): DamageResult {
  if (!attacker.pokemon || !defender.pokemon || move.basePower === 0) {
    return {
      move,
      minPercent: 0,
      maxPercent: 0,
      damageRange: [0, 0],
    };
  }

  const { level } = attacker;

  // Get attacking and defending stats
  const isPhysical = move.category === "Physical";
  const attackStat = isPhysical
    ? attacker.pokemon.baseStats.atk
    : attacker.pokemon.baseStats.spa;
  const defenseStat = isPhysical
    ? defender.pokemon.baseStats.def
    : defender.pokemon.baseStats.spd;

  // Apply stat boosts (each stage = 50% increase/decrease)
  const attackBoost = isPhysical
    ? attacker.statBoosts.atk
    : attacker.statBoosts.spa;
  const defenseBoost = isPhysical
    ? defender.statBoosts.def
    : defender.statBoosts.spd;

  const getBoostMultiplier = (boost: number) => {
    if (boost >= 0) return (2 + boost) / 2;
    return 2 / (2 + Math.abs(boost));
  };

  const attackMultiplier = getBoostMultiplier(attackBoost);
  const defenseMultiplier = getBoostMultiplier(defenseBoost);

  const finalAttack = Math.floor(attackStat * attackMultiplier);
  const finalDefense = Math.floor(defenseStat * defenseMultiplier);

  // Base damage calculation (simplified Pokémon formula)
  let baseDamage =
    Math.floor(
      Math.floor(
        (Math.floor((2 * level) / 5 + 2) * move.basePower * finalAttack) /
          finalDefense,
      ) / 50,
    ) + 2;

  // Apply type effectiveness
  const effectiveness = getTypeEffectiveness(move.type, defender.pokemon.types);
  baseDamage = Math.floor(baseDamage * effectiveness);

  // STAB (Same Type Attack Bonus)
  const hasStab = attacker.pokemon.types.includes(move.type);
  if (hasStab) {
    baseDamage = Math.floor(baseDamage * 1.5);
  }

  // Item modifiers (simplified)
  if (attacker.item === "Choice Band" && isPhysical)
    baseDamage = Math.floor(baseDamage * 1.5);
  if (attacker.item === "Choice Specs" && !isPhysical)
    baseDamage = Math.floor(baseDamage * 1.5);
  if (attacker.item === "Life Orb") baseDamage = Math.floor(baseDamage * 1.3);

  // Weather modifiers
  if (fieldConditions.weather === "sun") {
    if (move.type === "Fire") baseDamage = Math.floor(baseDamage * 1.5);
    if (move.type === "Water") baseDamage = Math.floor(baseDamage * 0.5);
  }
  if (fieldConditions.weather === "rain") {
    if (move.type === "Water") baseDamage = Math.floor(baseDamage * 1.5);
    if (move.type === "Fire") baseDamage = Math.floor(baseDamage * 0.5);
  }

  // Terrain modifiers (1.3x boost for grounded Pokémon)
  if (fieldConditions.terrain === "electric" && move.type === "Electric") {
    baseDamage = Math.floor(baseDamage * 1.3);
  }
  if (fieldConditions.terrain === "grassy" && move.type === "Grass") {
    baseDamage = Math.floor(baseDamage * 1.3);
  }
  if (fieldConditions.terrain === "psychic" && move.type === "Psychic") {
    baseDamage = Math.floor(baseDamage * 1.3);
  }
  if (fieldConditions.terrain === "misty" && move.type === "Dragon") {
    baseDamage = Math.floor(baseDamage * 0.5);
  }

  // Screen modifiers (halve damage in singles)
  if (fieldConditions.defenderSideConditions.reflect && isPhysical) {
    baseDamage = Math.floor(baseDamage * 0.5);
  }
  if (fieldConditions.defenderSideConditions.lightScreen && !isPhysical) {
    baseDamage = Math.floor(baseDamage * 0.5);
  }

  // Burn halves physical attack
  if (attacker.status === "burned" && isPhysical) {
    baseDamage = Math.floor(baseDamage * 0.5);
  }

  // Random multiplier range (0.85 - 1.00)
  const minDamage = Math.floor(baseDamage * 0.85);
  const maxDamage = baseDamage;

  // Calculate percentage of defender's HP
  const defenderHP = defender.pokemon.baseStats.hp;
  const minPercent = (minDamage / defenderHP) * 100;
  const maxPercent = (maxDamage / defenderHP) * 100;

  return {
    move,
    minPercent: Math.round(minPercent * 10) / 10,
    maxPercent: Math.round(maxPercent * 10) / 10,
    damageRange: [minDamage, maxDamage],
    guaranteed2HKO: minPercent * 2 >= 100,
    guaranteed3HKO: minPercent * 3 >= 100,
  };
}
