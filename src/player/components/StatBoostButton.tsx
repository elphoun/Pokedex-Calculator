import type { StatType } from "../../types";

interface StatBoostButtonProps {
  stat: Exclude<StatType, "hp">;
  boost: number;
  onBoost: (value: number) => void;
}

export function StatBoostButton({
  stat,
  boost,
  onBoost,
}: StatBoostButtonProps) {
  const statLabels: Record<Exclude<StatType, "hp">, string> = {
    atk: "ATK",
    def: "DEF",
    spa: "SPA",
    spd: "SPD",
    spe: "SPE",
  };

  const handleClick = () => {
    // Cycle through -6 to +6
    const nextBoost = boost >= 6 ? -6 : boost + 1;
    onBoost(nextBoost);
  };

  const getBoostColor = () => {
    if (boost > 0) return "bg-green-600 hover:bg-green-500";
    if (boost < 0) return "bg-red-600 hover:bg-red-500";
    return "bg-gray-600 hover:bg-gray-500";
  };

  return (
    <div className="flex-1 flex flex-col items-center gap-0.5">
      <p className="text-[8px] font-mono font-bold text-gray-300 text-center leading-none">
        {statLabels[stat]}
      </p>
      <button
        onClick={handleClick}
        className={`flex-1 w-full h-4 rounded border border-gray-700 flex items-center justify-center text-[8px] font-bold text-white transition-colors ${getBoostColor()}`}
      >
        {boost > 0 ? `+${boost}` : boost < 0 ? boost : "0"}
      </button>
    </div>
  );
}
