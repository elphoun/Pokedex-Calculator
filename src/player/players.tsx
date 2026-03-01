import { PokemonPanel } from "./components/PokemonPanel";
import type { DamageResult, Move } from "../types";
import { calculateDamage } from "../utils/damageCalculator";
import { useBattleStore } from "../context/store";
import { MOVES_DATABASE } from "../backend/data";

export default function Players() {
  const attacker = useBattleStore((state) => state.attacker);
  const defender = useBattleStore((state) => state.defender);
  const fieldConditions = useBattleStore((state) => state.fieldConditions);

  // Calculate damage from attacker's moves against defender
  const getAttackerDamageResults = (): DamageResult[] => {
    if (!attacker.pokemon || !defender.pokemon) return [];

    return MOVES_DATABASE.slice(0, 4).map((move: Move) =>
      calculateDamage(attacker, defender, move, fieldConditions),
    );
  };

  // Calculate damage from defender's moves against attacker
  const getDefenderDamageResults = (): DamageResult[] => {
    if (!defender.pokemon || !attacker.pokemon) return [];

    return MOVES_DATABASE.slice(0, 4).map((move: Move) =>
      calculateDamage(defender, attacker, move, {
        ...fieldConditions,
        // Swap side conditions when defender is attacking
        attackerSideConditions: fieldConditions.defenderSideConditions,
        defenderSideConditions: fieldConditions.attackerSideConditions,
      }),
    );
  };

  return (
    <>
      <div className="flex flex-col items-baseline gap-2 col-start-1 col-end-1">
        <PokemonPanel
          isAttacker={true}
          damageResults={getAttackerDamageResults()}
          label="Attacker"
        />{" "}
        <PokemonPanel
          isAttacker={false}
          damageResults={getDefenderDamageResults()}
          label="Defender"
        />
      </div>
      <div className="flex flex-col items-baseline gap-2 col-start-3 col-end-3">
        <PokemonPanel
          isAttacker={true}
          damageResults={getAttackerDamageResults()}
          label="Attacker"
        />{" "}
        <PokemonPanel
          isAttacker={false}
          damageResults={getDefenderDamageResults()}
          label="Defender"
        />
      </div>
    </>
  );
}
