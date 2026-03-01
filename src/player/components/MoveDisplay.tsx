import type { DamageResult } from "../../types";
import { getTypeColor } from "../../utils";

interface MoveDisplayProps {
  result: DamageResult;
}

export function MoveDisplay({ result }: MoveDisplayProps) {
  const { move, minPercent, maxPercent } = result;

  if (move.basePower === 0) return null;

  const safeMin = Math.max(0, Math.min(100, minPercent));
  const safeMax = Math.max(0, Math.min(100, maxPercent));
  const rangeWidth = Math.max(0, safeMax - safeMin);

  // Calculate positions for health bar (damage comes from right side)
  const greenWidth = 100 - safeMax; // Remaining health after max damage
  const lightRedWidth = rangeWidth; // Damage range (min to max)
  const darkRedWidth = safeMin; // Guaranteed damage

  return (
    <div className="flex flex-col gap-0.5 p-1 w-full">
      <div
        className="h-4 px-1.5 rounded flex items-center justify-center shadow-sm"
        style={{ backgroundColor: getTypeColor(move.type) }}
      >
        <p className="font-mono font-bold text-[9px] text-white leading-none truncate">
          {move.name}
        </p>
      </div>
      <div className="relative rounded-2xl bg-gray-300/20 h-4 w-full overflow-hidden">
        {/* Green: remaining health */}
        <div
          className="absolute h-full bg-green-500 rounded-l-full"
          style={{ left: 0, width: `${greenWidth}%` }}
        />
        {/* Light red: damage range (the variance) */}
        <div
          className="absolute h-full bg-red-400"
          style={{ left: `${greenWidth}%`, width: `${lightRedWidth}%` }}
        />
        {/* Dark red: guaranteed damage */}
        <div
          className="absolute h-full bg-red-600 rounded-r-full"
          style={{ left: `${greenWidth + lightRedWidth}%`, width: `${darkRedWidth}%` }}
        />
        {/* Percentage text */}
        <p className="absolute inset-0 flex items-center justify-center font-bold text-[9px] text-white leading-none drop-shadow-sm">
          {minPercent}% - {maxPercent}%
        </p>
      </div>
    </div>
  );
}
