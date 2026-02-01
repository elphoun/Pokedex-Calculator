import { useQuery } from "@tanstack/react-query";
import type { Pokemon, PokemonType } from "../types";

const POKEAPI_BASE = "https://pokeapi.co/api/v2";

interface PokeAPIResponse {
  types: Array<{ type: { name: string } }>;
  stats: Array<{ stat: { name: string }; base_stat: number }>;
  abilities: Array<{ ability: { name: string }; is_hidden: boolean }>;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
  };
  species: { name: string };
}

/**
 * Fetch Pokemon data from PokeAPI and convert to our Pokemon interface
 */
export async function getPokemonByName(name: string): Promise<Pokemon> {
  try {
    const response = await fetch(
      `${POKEAPI_BASE}/pokemon/${name.toLowerCase()}`,
    );
    if (!response.ok) throw new Error(`Pokemon not found: ${name}`);

    const pokemon: PokeAPIResponse = await response.json();

    // Get types
    const types: [PokemonType, PokemonType | null] = [
      capitalizeFirst(pokemon.types[0].type.name) as PokemonType,
      pokemon.types[1]
        ? (capitalizeFirst(pokemon.types[1].type.name) as PokemonType)
        : null,
    ];

    // Get base stats
    const baseStats = {
      hp: pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat ?? 0,
      atk: pokemon.stats.find((s) => s.stat.name === "attack")?.base_stat ?? 0,
      def: pokemon.stats.find((s) => s.stat.name === "defense")?.base_stat ?? 0,
      spa:
        pokemon.stats.find((s) => s.stat.name === "special-attack")
          ?.base_stat ?? 0,
      spd:
        pokemon.stats.find((s) => s.stat.name === "special-defense")
          ?.base_stat ?? 0,
      spe: pokemon.stats.find((s) => s.stat.name === "speed")?.base_stat ?? 0,
    };

    // Get abilities (up to 3: ability1, ability2, hidden ability)
    const regularAbilities = pokemon.abilities
      .filter((a) => !a.is_hidden)
      .map((a) => capitalizeFirst(a.ability.name));
    const hiddenAbility = pokemon.abilities.find((a) => a.is_hidden);

    const abilities: [string, string | null, string | null] = [
      regularAbilities[0] ?? "",
      regularAbilities[1] ?? null,
      hiddenAbility ? capitalizeFirst(hiddenAbility.ability.name) : null,
    ];

    // Get sprite URL
    const sprite =
      pokemon.sprites.front_default ??
      pokemon.sprites.other?.["official-artwork"]?.front_default ??
      "";

    return {
      species: capitalizeFirst(pokemon.species.name),
      nickname: capitalizeFirst(pokemon.species.name),
      types,
      baseStats,
      abilities,
      sprite,
    };
  } catch (error) {
    console.error(`Failed to fetch Pokemon: ${name}`, error);
    throw error;
  }
}

/**
 * Search for Pokemon by partial name match
 */
export async function searchPokemon(
  query: string,
  limit: number = 10,
): Promise<Pokemon[]> {
  try {
    const response = await fetch(`${POKEAPI_BASE}/pokemon?limit=1000&offset=0`);
    if (!response.ok) throw new Error("Failed to fetch Pokemon list");

    const data: { results: Array<{ name: string; url: string }> } =
      await response.json();
    const matches = data.results
      .filter((p) => p.name.includes(query.toLowerCase()))
      .slice(0, limit);

    const promises = matches.map((p) => getPokemonByName(p.name));
    return await Promise.all(promises);
  } catch (error) {
    console.error("Failed to search Pokemon", error);
    return [];
  }
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");
}

/**
 * Hook to fetch Pokemon data with caching via TanStack Query
 */
export function useGetPokemonByName(name: string | null) {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => (name ? getPokemonByName(name) : Promise.resolve(null)),
    enabled: !!name,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    gcTime: 1000 * 60 * 60 * 24, // 24 hours (formerly cacheTime)
  });
}

/**
 * Hook to search Pokemon with caching via TanStack Query
 */
export function useSearchPokemon(query: string, limit: number = 10) {
  return useQuery({
    queryKey: ["pokemon-search", query, limit],
    queryFn: () =>
      query.trim() ? searchPokemon(query, limit) : Promise.resolve([]),
    enabled: !!query.trim(),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
