import type { DamageResult, StatusCondition } from "../../types";
import { PokemonSelector } from "./PokemonSelector";
import { StatusIcon } from "./StatusIcon";
import { StatBoostButton } from "./StatBoostButton";
import { MoveDisplay } from "./MoveDisplay";
import { useBattleStore } from "../../context/store";
import { POKEMON_DATA } from "../../utils";
import { ITEMS } from "../../backend/data";
import { useState, useEffect } from "react";

// Sprite utility functions using PokeAPI
const getPokemonSpriteFromAPI = async (
  species: string | null,
): Promise<string> => {
  // If no species, return substitute sprite directly
  if (!species) {
    return await getPokemonSpriteFallback();
  }

  try {
    // Convert species name to ID format for PokeAPI
    const pokemonId = species
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .replace(/nidoran♀/g, "nidoran-f")
      .replace(/nidoran♂/g, "nidoran-m")
      .replace(/farfetchd/g, "farfetchd")
      .replace(/mrmime/g, "mr-mime")
      .replace(/type:null/g, "type-null");

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
    );
    if (!response.ok) throw new Error("Pokemon not found");

    const data = await response.json();

    // Prioritize pixel sprites over high-res artwork
    return (
      data.sprites.front_default ||
      data.sprites.other?.home?.front_default ||
      data.sprites.other?.["official-artwork"]?.front_default ||
      data.sprites.other?.dream_world?.front_default ||
      (await getPokemonSpriteFallback())
    );
  } catch {
    return await getPokemonSpriteFallback();
  }
};

const getPokemonSpriteFallback = async (): Promise<string> => {
  // Fetch substitute sprite from PokeAPI move endpoint
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23666666'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23333333'/%3E%3Ctext x='50' y='58' text-anchor='middle' fill='%23999999' font-size='12' font-family='Arial'%3E?%3C/text%3E%3C/svg%3E";
};

const getItemSpriteFromAPI = async (itemName: string): Promise<string> => {
  try {
    const itemId = itemName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");

    const response = await fetch(`https://pokeapi.co/api/v2/item/${itemId}`);
    if (!response.ok) throw new Error("Item not found");

    const data = await response.json();
    return data.sprites?.default || getItemIcon();
  } catch {
    return getItemIcon();
  }
};

const getTeraSprite = (teraType?: string | null): string => {
  // Load type-specific tera sprite from public folder
  if (teraType) {
    return `/tera_${teraType.toLowerCase()}.svg`;
  }
  return "/tera_normal.svg"; // Default tera sprite
};

const getItemIcon = (): string => {
  // Load default item icon from public folder
  return "/tera_normal.svg";
};

// Custom hook to handle Pokemon sprite loading
const usePokemonSprite = (species: string | null) => {
  const [sprite, setSprite] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPokemonSpriteFromAPI(species)
      .then(setSprite)
      .finally(() => setLoading(false));
  }, [species]);

  return { sprite, loading };
};

// Custom hook to handle Item sprite loading
const useItemSprite = (itemName: string | null) => {
  const [sprite, setSprite] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!itemName) {
      setSprite(getItemIcon());
      return;
    }

    setLoading(true);
    getItemSpriteFromAPI(itemName)
      .then(setSprite)
      .finally(() => setLoading(false));
  }, [itemName]);

  return { sprite, loading };
};

interface PokemonPanelProps {
  isAttacker: boolean;
  damageResults?: DamageResult[];
  label: string;
}

export function PokemonPanel({
  isAttacker,
  damageResults,
  label,
}: PokemonPanelProps) {
  const pokemonState = useBattleStore((state) =>
    isAttacker ? state.attacker : state.defender,
  );

  const setPokemon = useBattleStore((state) =>
    isAttacker ? state.setAttackerPokemon : state.setDefenderPokemon,
  );
  const setStatus = useBattleStore((state) =>
    isAttacker ? state.setAttackerStatus : state.setDefenderStatus,
  );
  const setStatBoost = useBattleStore((state) =>
    isAttacker ? state.setAttackerStatBoost : state.setDefenderStatBoost,
  );
  const setItem = useBattleStore((state) =>
    isAttacker ? state.setAttackerItem : state.setDefenderItem,
  );
  const setAbility = useBattleStore((state) =>
    isAttacker ? state.setAttackerAbility : state.setDefenderAbility,
  );
  const setTeraType = useBattleStore((state) =>
    isAttacker ? state.setAttackerTeraType : state.setDefenderTeraType,
  );

  const { pokemon, status, statBoosts, item, ability, teraType } = pokemonState;

  // Use custom hooks for sprite loading
  const { sprite: pokemonSprite, loading: pokemonSpriteLoading } =
    usePokemonSprite(pokemon?.species || null);
  const { sprite: itemSprite, loading: itemSpriteLoading } =
    useItemSprite(item);

  const statusConditions: StatusCondition[] = [
    "paralysis",
    "badly-poisoned",
    "poisoned",
    "burned",
    "frozen",
    "asleep",
  ];

  const handleStatusClick = (clickedStatus: StatusCondition) => {
    if (status === clickedStatus) {
      setStatus("none");
    } else {
      setStatus(clickedStatus);
    }
  };

  return (
    <div className="bg-[#555] rounded overflow-hidden shadow-lg border border-gray-600">
      {/* Header with label */}
      <p className="bg-[#333] px-2 py-0.5 text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wide">
        {label}
      </p>

      <div className="grid grid-cols-[100px_1fr] gap-3 p-2">
        {/* Search Bar - Fixed Height */}
        <div className="col-span-2">
          <PokemonSelector
            selectedPokemon={pokemon}
            onSelect={setPokemon}
            placeholder="Search Pokémon..."
          />
        </div>

        {/* Sprite */}
        <div className="row-start-2 w-24 h-24 bg-gray-700/40 rounded border border-gray-600 flex items-center justify-center shrink-0">
          {pokemonSpriteLoading ? (
            <div className="text-gray-400 text-xs text-center">Loading...</div>
          ) : (
            <img
              src={pokemonSprite}
              alt={pokemon?.species || "substitute"}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Fixed height content area to prevent shifts */}
        <div className="flex flex-col gap-2 row-start-2">
          {pokemon ? (
            <>
              {/* Right side info */}
              <div className="flex flex-row gap-1">
                {/* Tera Type */}
                <div className="flex flex-1 items-center gap-0.5">
                  <div className="w-7 h-7 shrink-0">
                    <img
                      src={getTeraSprite(teraType)}
                      alt="Tera"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback to normal tera if specific type fails
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes("tera_normal.svg")) {
                          target.src = "/tera_normal.svg";
                        }
                      }}
                    />
                  </div>
                  <select
                    value={teraType || ""}
                    onChange={(e) =>
                      setTeraType((e.target.value as any) || null)
                    }
                    className="flex-1 bg-gray-700 text-white text-[9px] font-mono px-1 py-0.5 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="">No Tera</option>
                    {Object.keys(POKEMON_DATA).map((type: string) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Item */}
                <div className="flex flex-2 items-center gap-0.5">
                  <div className="w-7 h-7 bg-gray-700/50 rounded flex items-center justify-center shrink-0">
                    {itemSpriteLoading ? (
                      <div className="w-3 h-3 bg-gray-600 rounded animate-pulse"></div>
                    ) : (
                      <img
                        src={itemSprite}
                        alt={item || "Item"}
                        onError={(e) => {
                          // Fallback to default item icon
                          const target = e.target as HTMLImageElement;
                          target.src = getItemIcon();
                        }}
                      />
                    )}
                  </div>
                  <select
                    value={item || ""}
                    onChange={(e) => setItem(e.target.value || null)}
                    className="flex-1 bg-gray-700 text-white text-[9px] font-mono px-1 py-0.5 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="">No Item</option>
                    {ITEMS.map((itemName: string) => (
                      <option key={itemName} value={itemName}>
                        {itemName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ability */}
              <div className="flex flex-row gap-3 pr-2">
                <select
                  value={ability || ""}
                  onChange={(e) => setAbility(e.target.value || null)}
                  className="flex-1 bg-gray-700 text-white text-[9px] font-mono px-1 py-0.5 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <option value="">Select Ability</option>
                  {pokemon.abilities.map((abilityName) => (
                    <option key={abilityName} value={abilityName || "N/A"}>
                      {abilityName}
                    </option>
                  ))}
                </select>

                {/* Status Icons */}
                <div className="grid grid-cols-6 gap-1 items-center">
                  {statusConditions.map((statusType) => (
                    <StatusIcon
                      key={statusType}
                      type={statusType}
                      active={status === statusType}
                      onClick={() => handleStatusClick(statusType)}
                    />
                  ))}
                </div>
              </div>

              {/* Stat Boosts */}
              <div className="flex flex-row items-center justify-between gap-1 w-full">
                <StatBoostButton
                  stat="atk"
                  boost={statBoosts.atk}
                  onBoost={(value) => setStatBoost("atk", value)}
                />
                <StatBoostButton
                  stat="def"
                  boost={statBoosts.def}
                  onBoost={(value) => setStatBoost("def", value)}
                />
                <StatBoostButton
                  stat="spa"
                  boost={statBoosts.spa}
                  onBoost={(value) => setStatBoost("spa", value)}
                />
                <StatBoostButton
                  stat="spd"
                  boost={statBoosts.spd}
                  onBoost={(value) => setStatBoost("spd", value)}
                />
                <StatBoostButton
                  stat="spe"
                  boost={statBoosts.spe}
                  onBoost={(value) => setStatBoost("spe", value)}
                />
              </div>
            </>
          ) : (
            /* Empty State - Same height as filled */
            <div className="flex items-center justify-center h-full">
              <p className="text-xs text-gray-500 font-mono">
                Select a Pokémon
              </p>
            </div>
          )}
        </div>

        <div className="col-start-1 col-span-3 flex flex-row w-full gap-3 justify-between">
          {/* Always show 4 move slots */}
          {[0, 1, 2, 3].map((idx) => {
            const result = damageResults?.[idx];
            return result ? (
              <MoveDisplay key={idx} result={result} />
            ) : (
              <div key={idx} className="flex flex-col gap-0.5 flex-1">
                <div className="h-4 px-1.5 rounded flex items-center justify-center shadow-sm bg-gray-600/50 border border-gray-500">
                  <p className="font-mono font-bold text-[9px] text-gray-400 leading-none">
                    Move {idx + 1}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-1">
                  <p className="font-bold text-[9px] text-gray-500 leading-none">
                    ---
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
