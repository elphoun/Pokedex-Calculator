import type { PokemonState, Stats, StatType, BattlePokemon, FieldConditions, TeamSide } from "../types";
import { getNatureModifier } from "../types";

/**
 * Calculate a Pokemon's actual stat value from base stats, EVs, IVs, level, and nature.
 * Uses the standard Pokemon stat formula.
 *
 * HP Formula: floor((2 * Base + IV + floor(EV/4)) * Level/100) + Level + 10
 * Other Stats: floor((floor((2 * Base + IV + floor(EV/4)) * Level/100) + 5) * NatureModifier)
 */
export function calculateStat(
  baseStat: number,
  iv: number,
  ev: number,
  level: number,
  nature: string | null,
  statType: StatType
): number {
  if (statType === "hp") {
    // HP has a different formula
    return Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
  }

  const baseValue = Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + 5;
  const natureMod = getNatureModifier(nature, statType);
  return Math.floor(baseValue * natureMod);
}

/**
 * Calculate all stats for a Pokemon state.
 */
export function calculateAllStats(pokemonState: PokemonState): Stats {
  if (!pokemonState.pokemon) {
    return { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
  }

  const { pokemon, level, ivs, evs, nature } = pokemonState;
  const baseStats = pokemon.baseStats;

  return {
    hp: calculateStat(baseStats.hp, ivs.hp, evs.hp, level, nature, "hp"),
    atk: calculateStat(baseStats.atk, ivs.atk, evs.atk, level, nature, "atk"),
    def: calculateStat(baseStats.def, ivs.def, evs.def, level, nature, "def"),
    spa: calculateStat(baseStats.spa, ivs.spa, evs.spa, level, nature, "spa"),
    spd: calculateStat(baseStats.spd, ivs.spd, evs.spd, level, nature, "spd"),
    spe: calculateStat(baseStats.spe, ivs.spe, evs.spe, level, nature, "spe"),
  };
}

/**
 * Calculate the effective speed of a Pokemon, considering stat boosts,
 * status conditions, items, abilities, and field conditions.
 */
export function calculateEffectiveSpeed(
  battlePokemon: BattlePokemon,
  fieldConditions: FieldConditions,
  teamSide: TeamSide
): number {
  if (!battlePokemon.pokemon) return 0;

  const baseSpeed = calculateStat(
    battlePokemon.pokemon.baseStats.spe,
    battlePokemon.ivs.spe,
    battlePokemon.evs.spe,
    battlePokemon.level,
    battlePokemon.nature,
    "spe"
  );

  let effectiveSpeed = baseSpeed;

  // Apply stat boosts (each stage = 50% increase/decrease)
  const speBoost = battlePokemon.statBoosts.spe;
  if (speBoost >= 0) {
    effectiveSpeed = Math.floor(effectiveSpeed * ((2 + speBoost) / 2));
  } else {
    effectiveSpeed = Math.floor(effectiveSpeed * (2 / (2 + Math.abs(speBoost))));
  }

  // Paralysis halves speed (Gen 7+)
  if (battlePokemon.status === "paralysis") {
    effectiveSpeed = Math.floor(effectiveSpeed * 0.5);
  }

  // Tailwind doubles speed
  const sideConditions = teamSide === "player" ? fieldConditions.playerSide : fieldConditions.opponentSide;
  if (sideConditions.tailwind) {
    effectiveSpeed *= 2;
  }

  // Choice Scarf
  if (battlePokemon.item === "Choice Scarf") {
    effectiveSpeed = Math.floor(effectiveSpeed * 1.5);
  }

  // TODO: Add ability modifiers (Swift Swim, Chlorophyll, Surge Surfer, etc.)
  // TODO: Add item modifiers (Iron Ball halving speed, etc.)

  return effectiveSpeed;
}

/**
 * Calculate the effective attack or special attack stat.
 */
export function calculateEffectiveAttack(
  battlePokemon: BattlePokemon,
  isPhysical: boolean
): number {
  if (!battlePokemon.pokemon) return 0;

  const statType = isPhysical ? "atk" : "spa";
  const baseStat = battlePokemon.pokemon.baseStats[statType];

  let effectiveStat = calculateStat(
    baseStat,
    battlePokemon.ivs[statType],
    battlePokemon.evs[statType],
    battlePokemon.level,
    battlePokemon.nature,
    statType
  );

  // Apply stat boosts
  const boost = battlePokemon.statBoosts[statType];
  if (boost >= 0) {
    effectiveStat = Math.floor(effectiveStat * ((2 + boost) / 2));
  } else {
    effectiveStat = Math.floor(effectiveStat * (2 / (2 + Math.abs(boost))));
  }

  // Burn halves physical attack
  if (isPhysical && battlePokemon.status === "burned") {
    effectiveStat = Math.floor(effectiveStat * 0.5);
  }

  // Choice items
  if (battlePokemon.item === "Choice Band" && isPhysical) {
    effectiveStat = Math.floor(effectiveStat * 1.5);
  }
  if (battlePokemon.item === "Choice Specs" && !isPhysical) {
    effectiveStat = Math.floor(effectiveStat * 1.5);
  }

  return effectiveStat;
}

/**
 * Calculate the effective defense or special defense stat.
 */
export function calculateEffectiveDefense(
  battlePokemon: BattlePokemon,
  isPhysical: boolean
): number {
  if (!battlePokemon.pokemon) return 0;

  const statType = isPhysical ? "def" : "spd";
  const baseStat = battlePokemon.pokemon.baseStats[statType];

  let effectiveStat = calculateStat(
    baseStat,
    battlePokemon.ivs[statType],
    battlePokemon.evs[statType],
    battlePokemon.level,
    battlePokemon.nature,
    statType
  );

  // Apply stat boosts
  const boost = battlePokemon.statBoosts[statType];
  if (boost >= 0) {
    effectiveStat = Math.floor(effectiveStat * ((2 + boost) / 2));
  } else {
    effectiveStat = Math.floor(effectiveStat * (2 / (2 + Math.abs(boost))));
  }

  // Eviolite boosts both defenses by 1.5x for non-fully evolved Pokemon
  // TODO: Check if Pokemon is NFE (not fully evolved)
  // if (battlePokemon.item === "Eviolite" && isNFE(battlePokemon.pokemon)) {
  //   effectiveStat = Math.floor(effectiveStat * 1.5);
  // }

  // Assault Vest boosts SpD by 1.5x
  if (!isPhysical && battlePokemon.item === "Assault Vest") {
    effectiveStat = Math.floor(effectiveStat * 1.5);
  }

  return effectiveStat;
}

/**
 * Get HP percentage for display.
 */
export function getHpPercentage(battlePokemon: BattlePokemon): number {
  if (battlePokemon.maxHp === 0) return 0;
  return (battlePokemon.currentHp / battlePokemon.maxHp) * 100;
}

/**
 * Get HP bar color based on percentage.
 */
export function getHpBarColor(percentage: number): string {
  if (percentage > 50) return "bg-green-500";
  if (percentage > 20) return "bg-yellow-500";
  return "bg-red-500";
}

/**
 * Validate EV total (max 508 total, max 252 per stat).
 */
export function validateEVs(evs: Stats): { valid: boolean; total: number; errors: string[] } {
  const errors: string[] = [];
  const total = Object.values(evs).reduce((sum, ev) => sum + ev, 0);

  if (total > 508) {
    errors.push(`Total EVs (${total}) exceeds maximum of 508`);
  }

  for (const [stat, value] of Object.entries(evs)) {
    if (value > 252) {
      errors.push(`${stat.toUpperCase()} EVs (${value}) exceed maximum of 252`);
    }
    if (value < 0) {
      errors.push(`${stat.toUpperCase()} EVs cannot be negative`);
    }
  }

  return { valid: errors.length === 0, total, errors };
}

/**
 * Validate IV total (max 31 per stat).
 */
export function validateIVs(ivs: Stats): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const [stat, value] of Object.entries(ivs)) {
    if (value > 31) {
      errors.push(`${stat.toUpperCase()} IVs (${value}) exceed maximum of 31`);
    }
    if (value < 0) {
      errors.push(`${stat.toUpperCase()} IVs cannot be negative`);
    }
  }

  return { valid: errors.length === 0, errors };
}