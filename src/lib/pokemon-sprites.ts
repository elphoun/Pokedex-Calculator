/**
 * Utility functions for handling Pokemon sprites from PokeAPI
 */

/**
 * Converts Pokemon species name to PokeAPI-compatible ID format
 */
export function formatPokemonId(species: string): string {
  return species
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/nidoran♀/g, "nidoran-f")
    .replace(/nidoran♂/g, "nidoran-m")
    .replace(/farfetchd/g, "farfetchd")
    .replace(/mrmime/g, "mr-mime")
    .replace(/type:null/g, "type-null");
}

/**
 * Fetches substitute sprite from PokeAPI move endpoint
 */
export async function getSubstituteSprite(): Promise<string> {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/move/164/");
    const data = await res.json();
    return data.sprites?.default || getDefaultSpritePlaceholder();
  } catch {
    return getDefaultSpritePlaceholder();
  }
}

/**
 * Returns a default SVG placeholder for sprites
 */
export function getDefaultSpritePlaceholder(): string {
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23666666'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23333333'/%3E%3Ctext x='50' y='58' text-anchor='middle' fill='%23999999' font-size='12' font-family='Arial'%3E?%3C/text%3E%3C/svg%3E";
}

/**
 * Fetches Pokemon sprite from PokeAPI with fallback to substitute
 */
export async function fetchPokemonSprite(species: string | null): Promise<string> {
  // If no species, return substitute sprite directly
  if (!species) {
    return await getSubstituteSprite();
  }

  try {
    const pokemonId = formatPokemonId(species);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    
    if (!response.ok) throw new Error("Pokemon not found");

    const data = await response.json();

    // Prioritize pixel sprites over high-res artwork
    return (
      data.sprites.front_default ||
      data.sprites.other?.home?.front_default ||
      data.sprites.other?.["official-artwork"]?.front_default ||
      data.sprites.other?.dream_world?.front_default ||
      (await getSubstituteSprite())
    );
  } catch {
    return await getSubstituteSprite();
  }
}

/**
 * Fetches item sprite from PokeAPI
 */
export async function fetchItemSprite(itemName: string): Promise<string> {
  try {
    const itemId = itemName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");

    const response = await fetch(`https://pokeapi.co/api/v2/item/${itemId}`);
    if (!response.ok) throw new Error("Item not found");

    const data = await response.json();
    return data.sprites?.default || getDefaultItemIcon();
  } catch {
    return getDefaultItemIcon();
  }
}

/**
 * Returns default item icon path
 */
export function getDefaultItemIcon(): string {
  return "/tera_normal.svg";
}

/**
 * Gets tera type sprite path
 */
export function getTeraSpritePath(teraType?: string | null): string {
  if (teraType) {
    return `/tera_${teraType.toLowerCase()}.svg`;
  }
  return "/tera_normal.svg";
}