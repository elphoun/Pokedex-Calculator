import type { Pokemon, Team } from "../types";

function parsePokemonFromText(text: string): Pokemon {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l);

  // Default values
  let species = "";
  let nickname = "";

  if (lines.length === 0) {
    return {
      species: "",
      nickname: "",
      types: ["Normal", null],
      baseStats: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      abilities: ["", null, null],
    };
  }

  // Parse first line (species/nickname)
  let firstLine = lines[0];

  // Remove item if present (e.g., "Pikachu @ Light Ball")
  if (firstLine.includes(" @ ")) {
    firstLine = firstLine.split(" @ ")[0].trim();
  }

  // Parse species/nickname/gender
  const nameParts = firstLine.split(" (");
  if (nameParts.length === 1) {
    // Just species, no nickname or gender
    species = firstLine;
    nickname = firstLine;
  } else {
    // Has nickname or gender in parentheses
    // Remove gender marker if present
    if (
      nameParts[nameParts.length - 1].startsWith("M)") ||
      nameParts[nameParts.length - 1].startsWith("F)")
    ) {
      nameParts.pop();
    }

    if (nameParts.length === 1) {
      species = nameParts[0];
      nickname = nameParts[0];
    } else {
      nickname = nameParts[0];
      species = nameParts[1].replace(")", "");
    }
  }

  // Note: types, baseStats, and abilities need to be filled from PokeAPI or data source
  // The paste format doesn't include this data
  return {
    species,
    nickname,
    types: ["Normal", null],
    baseStats: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    abilities: ["", null, null],
  };
}

/**
 * Parse a team from plain text format (Pokepastes syntax)
 * Each Pokemon is separated by blank lines
 */
export function teamFromText(text: string, teamID: number = 0): Team {
  const pokemonBlocks = text.split(/\n\s*\n/).filter((block) => block.trim());
  const pokemon = pokemonBlocks.map((block) => parsePokemonFromText(block));
  return {
    teamID,
    pokemon,
  };
}
