import { useState, useRef, useEffect } from "react";
import type { Pokemon } from "../../types";
import { useSearchPokemon } from "../../backend/pull";
import { getTypeColor } from "../../utils";

interface PokemonSelectorProps {
  selectedPokemon: Pokemon | null;
  onSelect: (pokemon: Pokemon | null) => void;
  placeholder?: string;
}

export function PokemonSelector({
  selectedPokemon,
  onSelect,
  placeholder = "Search Pokémon...",
}: PokemonSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use TanStack Query hook for cached search results
  const { data: searchResults = [] } = useSearchPokemon(searchQuery);

  // Keep input text in sync with selection
  useEffect(() => {
    if (selectedPokemon) {
      setSearchQuery(returnName(selectedPokemon));
    } else {
      setSearchQuery("");
    }
  }, [selectedPokemon]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (pokemon: Pokemon) => {
    onSelect(pokemon);
    setSearchQuery(returnName(pokemon));
    setIsOpen(false);
  };

  const returnName = (selectedPokemon: Pokemon) => {
    if (selectedPokemon.nickname === selectedPokemon.species) {
      return selectedPokemon.species;
    } else {
      return `${selectedPokemon.nickname} (${selectedPokemon.species})`;
    }
  };

  const getTypeStyle = (pokemon: Pokemon | null) => {
    if (!pokemon) return {};
    const [primary, secondary] = pokemon.types;
    const primaryColor = getTypeColor(primary);
    if (!secondary) {
      return { backgroundColor: primaryColor };
    }
    const secondaryColor = getTypeColor(secondary);
    return {
      backgroundImage: `linear-gradient(135deg, ${primaryColor} 0 50%, ${secondaryColor} 50% 100%)`,
    };
  };

  const getInputStyle = () => {
    if (selectedPokemon) return getTypeStyle(selectedPokemon);

    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) return {};

    const exact = searchResults.find(
      (pokemon) => pokemon.species.toLowerCase() === trimmed,
    );
    return exact ? getTypeStyle(exact) : {};
  };

  return (
    <div className="relative">
      <div className="relative h-full">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            const trimmed = searchQuery.trim().toLowerCase();
            if (!trimmed) return;

            const exact = searchResults.find(
              (pokemon) => pokemon.species.toLowerCase() === trimmed,
            );
            if (exact) {
              e.preventDefault();
              handleSelect(exact);
            }
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          style={{ backgroundColor: "#a3320b", ...getInputStyle() }}
          className="w-full h-full text-white px-2 py-1 text-[10px] font-medium font-mono rounded-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
        />
      </div>

      {isOpen && searchResults.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-0.5 bg-[#2a2a2a] border border-gray-600 rounded-sm shadow-lg max-h-40 overflow-y-auto"
        >
          {searchResults.map((pokemon) => (
            <button
              key={pokemon.species}
              onClick={() => handleSelect(pokemon)}
              className="w-full px-2 py-1.5 text-left text-[10px] font-mono text-white hover:bg-[#3a3a3a] flex items-center gap-2"
            >
              <span className="flex-1">{pokemon.species}</span>
              <span className="text-[9px] text-gray-400">
                {pokemon.types.filter(Boolean).join("/")}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
