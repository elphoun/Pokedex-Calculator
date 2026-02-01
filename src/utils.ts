export const POKEMON_DATA = {
  Normal: {
    color: "#A8A878",
    effectiveness: { Rock: 0.5, Ghost: 0, Steel: 0.5 },
  },
  Fire: {
    color: "#F08030",
    effectiveness: {
      Fire: 0.5,
      Water: 0.5,
      Grass: 2,
      Ice: 2,
      Bug: 2,
      Rock: 0.5,
      Dragon: 0.5,
      Steel: 2,
    },
  },
  Water: {
    color: "#6890F0",
    effectiveness: {
      Fire: 2,
      Water: 0.5,
      Grass: 0.5,
      Ground: 2,
      Rock: 2,
      Dragon: 0.5,
    },
  },
  Electric: {
    color: "#F8D030",
    effectiveness: {
      Water: 2,
      Electric: 0.5,
      Grass: 0.5,
      Ground: 0,
      Flying: 2,
      Dragon: 0.5,
    },
  },
  Grass: {
    color: "#78C850",
    effectiveness: {
      Fire: 0.5,
      Water: 2,
      Grass: 0.5,
      Poison: 0.5,
      Ground: 2,
      Flying: 0.5,
      Bug: 0.5,
      Rock: 2,
      Dragon: 0.5,
      Steel: 0.5,
    },
  },
  Ice: {
    color: "#98D8D8",
    effectiveness: {
      Fire: 0.5,
      Water: 0.5,
      Grass: 2,
      Ice: 0.5,
      Ground: 2,
      Flying: 2,
      Dragon: 2,
      Steel: 0.5,
    },
  },
  Fighting: {
    color: "#C03028",
    effectiveness: {
      Normal: 2,
      Ice: 2,
      Poison: 0.5,
      Flying: 0.5,
      Psychic: 0.5,
      Bug: 0.5,
      Rock: 2,
      Ghost: 0,
      Dark: 2,
      Steel: 2,
      Fairy: 0.5,
    },
  },
  Poison: {
    color: "#A040A0",
    effectiveness: {
      Grass: 2,
      Poison: 0.5,
      Ground: 0.5,
      Rock: 0.5,
      Ghost: 0.5,
      Steel: 0,
      Fairy: 2,
    },
  },
  Ground: {
    color: "#E0C068",
    effectiveness: {
      Fire: 2,
      Electric: 2,
      Grass: 0.5,
      Poison: 2,
      Flying: 0,
      Bug: 0.5,
      Rock: 2,
      Steel: 2,
    },
  },
  Flying: {
    color: "#A890F0",
    effectiveness: {
      Electric: 0.5,
      Grass: 2,
      Fighting: 2,
      Bug: 2,
      Rock: 0.5,
      Steel: 0.5,
    },
  },
  Psychic: {
    color: "#F85888",
    effectiveness: {
      Fighting: 2,
      Poison: 2,
      Psychic: 0.5,
      Dark: 0,
      Steel: 0.5,
    },
  },
  Bug: {
    color: "#A8B820",
    effectiveness: {
      Fire: 0.5,
      Grass: 2,
      Fighting: 0.5,
      Poison: 0.5,
      Flying: 0.5,
      Psychic: 2,
      Ghost: 0.5,
      Dark: 2,
      Steel: 0.5,
      Fairy: 0.5,
    },
  },
  Rock: {
    color: "#B8A038",
    effectiveness: {
      Fire: 2,
      Ice: 2,
      Fighting: 0.5,
      Ground: 0.5,
      Flying: 2,
      Bug: 2,
      Steel: 0.5,
    },
  },
  Ghost: {
    color: "#705898",
    effectiveness: { Normal: 0, Psychic: 2, Ghost: 2, Dark: 0.5 },
  },
  Dragon: {
    color: "#7038F8",
    effectiveness: { Dragon: 2, Steel: 0.5, Fairy: 0 },
  },
  Dark: {
    color: "#705848",
    effectiveness: {
      Fighting: 0.5,
      Psychic: 2,
      Ghost: 2,
      Dark: 0.5,
      Fairy: 0.5,
    },
  },
  Steel: {
    color: "#B8B8D0",
    effectiveness: {
      Fire: 0.5,
      Water: 0.5,
      Electric: 0.5,
      Ice: 2,
      Rock: 2,
      Steel: 0.5,
      Fairy: 2,
    },
  },
  Fairy: {
    color: "#EE99AC",
    effectiveness: {
      Fire: 0.5,
      Fighting: 2,
      Poison: 0.5,
      Dragon: 2,
      Dark: 2,
      Steel: 0.5,
    },
  },
} as const;

export type PokemonType = keyof typeof POKEMON_DATA;

export const getTypeColor = (type: PokemonType): string => {
  return POKEMON_DATA[type]?.color || "#777";
};
