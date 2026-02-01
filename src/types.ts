// Import from utils and re-export for convenience
import { POKEMON_DATA } from "./utils";

// fundamentals:
export type PokemonType = keyof typeof POKEMON_DATA;

export type StatusCondition =
  | "none"
  | "paralysis"
  | "badly-poisoned"
  | "poisoned"
  | "burned"
  | "frozen"
  | "asleep";

export type StatType = "hp" | "atk" | "def" | "spa" | "spd" | "spe";

export type MoveCategory = "Physical" | "Special" | "Status";

export type Weather = "none" | "sun" | "rain" | "sand" | "snow";

export type Terrain = "none" | "electric" | "grassy" | "misty" | "psychic";

// Pokemon
export interface Team {
  teamID: number;
  pokemon: (Pokemon | null)[];
}

export interface Pokemon {
  species: string;
  nickname: string;
  types: readonly [PokemonType, PokemonType | null];
  baseStats: Stats;
  abilities: readonly [string, string | null, string | null];
  sprite?: string;
}

export interface Stats {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

export interface Move {
  name: string;
  type: PokemonType;
  category: MoveCategory;
  basePower: number;
  accuracy: number;
}

// Field
export interface FieldConditions {
  // w/t
  weather: Weather;
  terrain: Terrain;
  // field
  trickRoom: boolean;
  wonderRoom: boolean;
  magicRoom: boolean;
  tailwind: boolean;
  // screens
  reflect: boolean;
  lightScreen: boolean;
  auroraVeil: boolean;
  gravity: boolean;
  // side conditions
  attackerSideConditions: SideConditions;
  defenderSideConditions: SideConditions;
}

export interface SideConditions {
  reflect: boolean;
  lightScreen: boolean;
  tailwind: boolean;
  stealthRock: boolean;
}

export interface StatBoosts {
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

export interface PokemonState {
  pokemon: Pokemon | null;
  status: StatusCondition;
  statBoosts: StatBoosts;
  item: string | null;
  ability: string | null;
  level: number;
  evs: Stats;
  ivs: Stats;
  nature: string | null;
  teraType: PokemonType | null;
}

export interface DamageResult {
  move: Move;
  minPercent: number;
  maxPercent: number;
  damageRange: [number, number];
  guaranteed2HKO?: boolean;
  guaranteed3HKO?: boolean;
}
