import type { StatusCondition } from "../../types";

interface StatusIconProps {
  type: StatusCondition;
  active: boolean;
  onClick: () => void;
}

export function StatusIcon({ type, active, onClick }: StatusIconProps) {
  if (type === "none") return null;

  const iconMap = {
    paralysis: "/paralysis.svg",
    "badly-poisoned": "/badly_poisoned.svg",
    poisoned: "/poisoned.svg",
    burned: "/burned.svg",
    frozen: "/frozen.svg",
    asleep: "/asleep.svg",
  };

  return (
    <button
      onClick={onClick}
      className={`w-4 h-4 transition-opacity ${
        active ? "opacity-100" : "opacity-30 hover:opacity-50"
      }`}
      title={type}
    >
      <img
        src={iconMap[type]}
        alt={type}
        className="w-full h-full object-contain"
      />
    </button>
  );
}
