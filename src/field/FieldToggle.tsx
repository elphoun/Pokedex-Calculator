import { Cloud } from "lucide-react";

type ToggleItem = {
  key: string;
  label: string;
  onClick: () => void;
  isActive: boolean;
  icon?: typeof Cloud;
};

const sectionLabelClass =
  "text-[9px] font-mono font-bold text-orange-400 mb-0.5 block uppercase tracking-wide";
const toggleButtonClass =
  "px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase transition-all flex items-center justify-center gap-0.5";
const toggleActiveClass = "bg-orange-600 text-white ring-1 ring-orange-400";
const toggleInactiveClass = "bg-gray-700 text-gray-300 hover:bg-gray-600";
const toggleIconClass = "w-2.5 h-2.5";

export default function FieldToggle({ title, items }: { title: string; items: ToggleItem[] }) {
  return (
    <div className="flex flex-col">
      <label className={sectionLabelClass}>{title}</label>
      <div className="flex flex-row flex-wrap gap-0.5">
        {items.map(({ key, label, onClick, isActive, icon: Icon }) => (
          <button
            key={key}
            onClick={onClick}
            className={`${toggleButtonClass} ${
              isActive ? toggleActiveClass : toggleInactiveClass
            }`}
          >
            {Icon && <Icon className={toggleIconClass} />}
            <span className="truncate">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
