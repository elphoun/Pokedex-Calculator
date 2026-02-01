import type { DamageResult } from "../../types";
import { getTypeColor } from "../../utils";

interface MoveDisplayProps {
  result: DamageResult;
}

export function MoveDisplay({ result }: MoveDisplayProps) {
  const { move, minPercent, maxPercent } = result;

  if (move.basePower === 0) return null;

  const damagePercent = `${minPercent.toFixed(1)}% - ${maxPercent.toFixed(1)}%`;

  const getKOIndicator = () => {
    if (minPercent >= 100) return "OHKO";
    if (result.guaranteed2HKO) return "2HKO";
    if (result.guaranteed3HKO) return "3HKO";
    return null;
  };

  const koIndicator = getKOIndicator();

  return (
    <div className="flex flex-col gap-0.5">
      <div
        className="h-4 px-1.5 rounded flex items-center justify-center shadow-sm"
        style={{ backgroundColor: getTypeColor(move.type) }}
      >
        <p className="font-mono font-bold text-[9px] text-white leading-none truncate">
          {move.name}
        </p>
      </div>
      <div className="flex items-center justify-between gap-1">
        <p className="font-bold text-[9px] text-white leading-none">
          {damagePercent}
        </p>
        {koIndicator && (
          <span className="text-[8px] font-bold text-green-400 leading-none px-1 bg-green-900/30 rounded">
            {koIndicator}
          </span>
        )}
      </div>
    </div>
  );
}
