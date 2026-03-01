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

// VGC Battle Types
export type SlotPosition = 0 | 1;
export type TeamSide = "player" | "opponent";
export type BattleSlotId = `${TeamSide}-${SlotPosition}`;

export type MoveTargetType =
  | "selected" // Single target selected by user
  | "all-opponents" // Hits both opponents
  | "all-pokemon" // Hits everyone including allies
  | "user" // Self-target
  | "user-and-allies" // User + ally
  | "ally" // Just the ally
  | "adjacent" // Any adjacent Pokemon
  | "adjacent-ally" // Adjacent ally only
  | "adjacent-opponent" // Adjacent opponent only
  | "field" // Field effects (weather, terrain)
  | "user-side" // Affects user's side only
  | "opponent-side"; // Affects opponent's side only

export type Nature = {
  name: string;
  increased: StatType | null;
  decreased: StatType | null;
};

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
  priority: number;
  targetType: MoveTargetType;
  pp: number;
  secondary?: {
    chance: number;
    status?: StatusCondition;
    statBoost?: { stat: StatType; boost: number; target: "user" | "target" };
  };
}

// Battle Pokemon - extends PokemonState with battle state
export interface BattlePokemon extends PokemonState {
  id: string; // Unique identifier for this Pokemon instance
  currentHp: number;
  maxHp: number;
  isFainted: boolean;
  slotPosition: SlotPosition | null;
  teamSide: TeamSide;
  moves: Move[];
  pp: number[]; // PP for each move
  hasMovedThisTurn: boolean;
  isProtected: boolean;
  isDynamaxed: boolean;
  terastallized: boolean;
  turnCount: number; // Number of turns this Pokemon has been active
}

// Team for VGC (6 Pokemon max)
export interface VGCTeam {
  pokemon: (BattlePokemon | null)[];
  side: TeamSide;
}

// Action selection types
export type ActionType = "move" | "switch" | "none";

export interface MoveAction {
  type: "move";
  slotId: BattleSlotId;
  moveIndex: number;
  targetSlotId: BattleSlotId; // For targeted moves
}

export interface SwitchAction {
  type: "switch";
  slotId: BattleSlotId; // The slot the switch is for
  benchIndex: number; // Index in the team's bench
}

export interface NoAction {
  type: "none";
  slotId: BattleSlotId;
}

export type SelectedAction = MoveAction | SwitchAction | NoAction;

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
  // screens - per side
  playerSide: SideConditions;
  opponentSide: SideConditions;
  // gravity
  gravity: boolean;
}

export interface SideConditions {
  reflect: boolean;
  reflectTurns: number;
  lightScreen: boolean;
  lightScreenTurns: number;
  auroraVeil: boolean;
  auroraVeilTurns: number;
  tailwind: boolean;
  tailwindTurns: number;
  stealthRock: boolean;
  spikes: number; // 0-3 layers
  toxicSpikes: number; // 0-2 layers
  stickyWeb: boolean;
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
  statusTurns: number;
  statBoosts: StatBoosts;
  item: string | null;
  ability: string | null;
  level: number;
  evs: Stats;
  ivs: Stats;
  nature: string | null;
  teraType: PokemonType | null;
}

// Complete battle state for history/undo
export interface BattleState {
  turnNumber: number;
  phase: "team-preview" | "lead-selection" | "action-selection" | "turn-resolution" | "battle-end";
  playerTeam: VGCTeam;
  opponentTeam: VGCTeam;
  fieldConditions: FieldConditions;
  turnOrder: BattleSlotId[];
  selectedActions: SelectedAction[];
  turnLog: TurnLogEntry[];
  winner: TeamSide | null;
}

export interface TurnLogEntry {
  turn: number;
  actions: {
    actor: BattleSlotId;
    action: SelectedAction;
    result: string;
  }[];
  faints: BattleSlotId[];
}

export interface DamageResult {
  move: Move;
  minPercent: number;
  maxPercent: number;
  damageRange: [number, number];
  guaranteed2HKO?: boolean;
  guaranteed3HKO?: boolean;
}

// Helper type for Pokemon slot in UI
export interface PokemonSlot {
  slotId: BattleSlotId;
  pokemon: BattlePokemon | null;
  isSelected: boolean;
  isTargetable: boolean;
}

// Nature definitions
export const NATURES: Nature[] = [
  { name: "Hardy", increased: null, decreased: null },
  { name: "Lonely", increased: "atk", decreased: "def" },
  { name: "Brave", increased: "atk", decreased: "spe" },
  { name: "Adamant", increased: "atk", decreased: "spa" },
  { name: "Naughty", increased: "atk", decreased: "spd" },
  { name: "Bold", increased: "def", decreased: "atk" },
  { name: "Docile", increased: null, decreased: null },
  { name: "Relaxed", increased: "def", decreased: "spe" },
  { name: "Impish", increased: "def", decreased: "spa" },
  { name: "Lax", increased: "def", decreased: "spd" },
  { name: "Timid", increased: "spe", decreased: "atk" },
  { name: "Hasty", increased: "spe", decreased: "def" },
  { name: "Serious", increased: null, decreased: null },
  { name: "Jolly", increased: "spe", decreased: "spa" },
  { name: "Naive", increased: "spe", decreased: "spd" },
  { name: "Modest", increased: "spa", decreased: "atk" },
  { name: "Mild", increased: "spa", decreased: "def" },
  { name: "Quiet", increased: "spa", decreased: "spe" },
  { name: "Bashful", increased: null, decreased: null },
  { name: "Rash", increased: "spa", decreased: "spd" },
  { name: "Calm", increased: "spd", decreased: "atk" },
  { name: "Gentle", increased: "spd", decreased: "def" },
  { name: "Sassy", increased: "spd", decreased: "spe" },
  { name: "Careful", increased: "spd", decreased: "spa" },
  { name: "Quirky", increased: null, decreased: null },
];

// Helper function to get nature modifier
export function getNatureModifier(nature: string | null, stat: StatType): number {
  if (!nature) return 1;
  const natureData = NATURES.find((n) => n.name === nature);
  if (!natureData || !natureData.increased || !natureData.decreased) return 1;
  if (natureData.increased === stat) return 1.1;
  if (natureData.decreased === stat) return 0.9;
  return 1;
}
