import type { Weather, Terrain } from "../types";
import {
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
  Wind,
  Zap,
  Leaf,
  Sparkles,
  Brain,
  Shield,
} from "lucide-react";
import FieldToggle from "./FieldToggle";
import { useBattleStore } from "../context/store";

export function FieldConditions() {
  const fieldConditions = useBattleStore((state) => state.fieldConditions);
  const setFieldConditions = useBattleStore(
    (state) => state.setFieldConditions,
  );
  const toggleAttackerSideCondition = useBattleStore(
    (state) => state.toggleAttackerSideCondition,
  );

  const updateWeather = (weather: Weather) => {
    setFieldConditions({ weather });
  };

  const updateTerrain = (terrain: Terrain) => {
    setFieldConditions({ terrain });
  };

  const toggleTrickRoom = () => {
    setFieldConditions({ trickRoom: !fieldConditions.trickRoom });
  };

  const weatherIcons = {
    none: Cloud,
    sun: Sun,
    rain: CloudRain,
    sand: Wind,
    snow: CloudSnow,
  };

  const terrainIcons = {
    none: Sparkles,
    electric: Zap,
    grassy: Leaf,
    misty: Sparkles,
    psychic: Brain,
  };

  return (
    <div className="bg-[#555] rounded overflow-hidden shadow-lg border border-gray-600 col-start-2 col-end-2 row-start-1 row-end-2">
      <div className="bg-[#333] px-2 py-0.5 border-b border-gray-700">
        <p className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wide">
          Field Conditions
        </p>
      </div>

      <div className="p-1.5 space-y-1.5">
        {/* Weather and Terrain */}
        <div className="grid grid-cols-2 gap-1.5">
          {/* Weather */}
          <FieldToggle
            title="Weather"
            items={(["none", "sun", "rain", "sand", "snow"] as Weather[]).map(
              (weather) => ({
                key: weather,
                label: weather === "none" ? "Clr" : weather.slice(0, 3),
                onClick: () => updateWeather(weather),
                isActive: fieldConditions.weather === weather,
                icon: weatherIcons[weather],
              }),
            )}
          />

          {/* Terrain */}
          <FieldToggle
            title="Terrain"
            items={(
              ["none", "electric", "grassy", "misty", "psychic"] as Terrain[]
            ).map((terrain) => ({
              key: terrain,
              label: terrain === "none" ? "Non" : terrain.slice(0, 3),
              onClick: () => updateTerrain(terrain),
              isActive: fieldConditions.terrain === terrain,
              icon: terrainIcons[terrain],
            }))}
          />
        </div>

        {/* Side Conditions */}
        <div className="grid grid-cols-2 gap-1.5">
          {/* Attacker Side */}
          <FieldToggle
            title="Attacker Side"
            items={[
              { key: "reflect", label: "Reflect", icon: Shield },
              { key: "lightScreen", label: "L.Screen", icon: Shield },
              { key: "tailwind", label: "Tailwind", icon: Wind },
            ].map(({ key, label, icon }) => ({
              key,
              label,
              onClick: () => toggleAttackerSideCondition(key as any),
              isActive:
                fieldConditions.attackerSideConditions[
                  key as keyof typeof fieldConditions.attackerSideConditions
                ],
              icon,
            }))}
          />

          {/* Global Conditions */}
          <FieldToggle
            title="Global"
            items={[
              {
                key: "trickRoom",
                label: "Trick Room",
                onClick: toggleTrickRoom,
                isActive: fieldConditions.trickRoom,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
