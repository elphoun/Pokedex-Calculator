import { create } from "zustand";
import type {
  BattlePokemon,
  BattleState,
  BattleSlotId,
  FieldConditions,
  Move,
  MoveAction,
  Pokemon,
  SelectedAction,
  SideConditions,
  SlotPosition,
  Stats,
  TeamSide,
  VGCTeam,
} from "../types";
import { calculateAllStats } from "../utils/statCalculator";

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Default values
const defaultSideConditions: SideConditions = {
  reflect: false,
  reflectTurns: 0,
  lightScreen: false,
  lightScreenTurns: 0,
  auroraVeil: false,
  auroraVeilTurns: 0,
  tailwind: false,
  tailwindTurns: 0,
  stealthRock: false,
  spikes: 0,
  toxicSpikes: 0,
  stickyWeb: false,
};

const defaultFieldConditions: FieldConditions = {
  weather: "none",
  terrain: "none",
  trickRoom: false,
  wonderRoom: false,
  magicRoom: false,
  tailwind: false,
  gravity: false,
  playerSide: { ...defaultSideConditions },
  opponentSide: { ...defaultSideConditions },
};

const defaultStats: Stats = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };
const defaultEVs: Stats = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
const defaultStatBoosts = { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };

// Convert a Pokemon to a BattlePokemon
export function createBattlePokemon(
  pokemon: Pokemon,
  moves: Move[],
  teamSide: TeamSide,
  slotPosition: SlotPosition | null = null
): BattlePokemon {
  const stats = calculateAllStats({
    pokemon,
    status: "none",
    statusTurns: 0,
    statBoosts: { ...defaultStatBoosts },
    item: null,
    ability: pokemon.abilities[0],
    level: 50,
    evs: { ...defaultEVs },
    ivs: { ...defaultStats },
    nature: "Hardy",
    teraType: null,
  });

  return {
    id: generateId(),
    pokemon,
    status: "none",
    statusTurns: 0,
    statBoosts: { ...defaultStatBoosts },
    item: null,
    ability: pokemon.abilities[0],
    level: 50,
    evs: { ...defaultEVs },
    ivs: { ...defaultStats },
    nature: "Hardy",
    teraType: null,
    currentHp: stats.hp,
    maxHp: stats.hp,
    isFainted: false,
    slotPosition,
    teamSide,
    moves,
    pp: moves.map((m) => m.pp),
    hasMovedThisTurn: false,
    isProtected: false,
    isDynamaxed: false,
    terastallized: false,
    turnCount: 0,
  };
}

// Create an empty team
function createEmptyTeam(side: TeamSide): VGCTeam {
  return {
    pokemon: [null, null, null, null, null, null],
    side,
  };
}

// Create initial battle state
function createInitialBattleState(): BattleState {
  return {
    turnNumber: 0,
    phase: "team-preview",
    playerTeam: createEmptyTeam("player"),
    opponentTeam: createEmptyTeam("opponent"),
    fieldConditions: { ...defaultFieldConditions },
    turnOrder: [],
    selectedActions: [],
    turnLog: [],
    winner: null,
  };
}

interface BattleStore {
  // Battle state
  battleState: BattleState;
  history: BattleState[];
  historyIndex: number;

  // Team management
  addPokemonToTeam: (side: TeamSide, pokemon: Pokemon, moves: Move[], slot: number) => void;
  removePokemonFromTeam: (side: TeamSide, slot: number) => void;
  setLead: (side: TeamSide, slot: number, position: SlotPosition) => void;
  switchPokemon: (side: TeamSide, activeSlot: SlotPosition, benchIndex: number) => void;

  // Battle actions
  selectAction: (action: SelectedAction) => void;
  clearAction: (slotId: BattleSlotId) => void;
  executeTurn: () => void;
  setTurnOrder: (order: BattleSlotId[]) => void;

  // Field conditions
  setFieldConditions: (conditions: Partial<FieldConditions>) => void;
  toggleSideCondition: (side: TeamSide, key: keyof SideConditions) => void;

  // Pokemon state updates
  updatePokemonHp: (slotId: BattleSlotId, newHp: number) => void;
  applyDamage: (slotId: BattleSlotId, damage: number) => void;
  setPokemonStatus: (slotId: BattleSlotId, status: BattlePokemon["status"]) => void;
  setPokemonStatBoost: (slotId: BattleSlotId, stat: keyof typeof defaultStatBoosts, value: number) => void;
  setPokemonItem: (slotId: BattleSlotId, item: string | null) => void;
  setPokemonAbility: (slotId: BattleSlotId, ability: string | null) => void;
  setPokemonTeraType: (slotId: BattleSlotId, teraType: string | null) => void;

  // History management
  saveToHistory: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Battle flow
  nextPhase: () => void;
  resetBattle: () => void;

  // Helpers
  getActivePokemon: (side: TeamSide) => (BattlePokemon | null)[];
  getBenchPokemon: (side: TeamSide) => (BattlePokemon | null)[];
  getPokemonAtSlot: (slotId: BattleSlotId) => BattlePokemon | null;
}

export const useBattleStore = create<BattleStore>((set, get) => ({
  battleState: createInitialBattleState(),
  history: [],
  historyIndex: -1,

  // Team management
  addPokemonToTeam: (side, pokemon, moves, slot) => {
    set((state) => {
      const team = side === "player" ? state.battleState.playerTeam : state.battleState.opponentTeam;
      const battlePokemon = createBattlePokemon(pokemon, moves, side);

      const newTeam: VGCTeam = {
        ...team,
        pokemon: team.pokemon.map((p, i) => (i === slot ? battlePokemon : p)),
      };

      return {
        battleState: {
          ...state.battleState,
          [side === "player" ? "playerTeam" : "opponentTeam"]: newTeam,
        },
      };
    });
  },

  removePokemonFromTeam: (side, slot) => {
    set((state) => {
      const team = side === "player" ? state.battleState.playerTeam : state.battleState.opponentTeam;
      const newTeam: VGCTeam = {
        ...team,
        pokemon: team.pokemon.map((p, i) => (i === slot ? null : p)),
      };

      return {
        battleState: {
          ...state.battleState,
          [side === "player" ? "playerTeam" : "opponentTeam"]: newTeam,
        },
      };
    });
  },

  setLead: (side, slot, position) => {
    set((state) => {
      const teamKey = side === "player" ? "playerTeam" : "opponentTeam";
      const team = state.battleState[teamKey];

      // Find the Pokemon at the slot
      const pokemon = team.pokemon[slot];
      if (!pokemon) return state;

      // Check if any Pokemon is already at this position
      const currentAtPosition = team.pokemon.findIndex(
        (p) => p?.slotPosition === position && p?.id !== pokemon.id
      );

      // Create new team with updated positions
      let newPokemon = [...team.pokemon];

      // Remove Pokemon from current position if swapping
      if (currentAtPosition >= 0) {
        newPokemon[currentAtPosition] = {
          ...newPokemon[currentAtPosition]!,
          slotPosition: pokemon.slotPosition,
        };
      }

      // Set new position for selected Pokemon
      newPokemon[slot] = {
        ...pokemon,
        slotPosition: position,
      };

      return {
        battleState: {
          ...state.battleState,
          [teamKey]: { ...team, pokemon: newPokemon },
        },
      };
    });
  },

  switchPokemon: (side, activeSlot, benchIndex) => {
    set((state) => {
      const teamKey = side === "player" ? "playerTeam" : "opponentTeam";
      const team = state.battleState[teamKey];

      const activeIndex = team.pokemon.findIndex(
        (p) => p?.slotPosition === activeSlot
      );
      const benchPokemon = team.pokemon[benchIndex];

      if (activeIndex < 0 || !benchPokemon || benchPokemon.isFainted) return state;

      // Swap positions
      const activePokemon = team.pokemon[activeIndex]!;
      const newPokemon = [...team.pokemon];

      newPokemon[activeIndex] = {
        ...benchPokemon,
        slotPosition: activeSlot,
      };
      newPokemon[benchIndex] = {
        ...activePokemon,
        slotPosition: null,
      };

      return {
        battleState: {
          ...state.battleState,
          [teamKey]: { ...team, pokemon: newPokemon },
        },
      };
    });
  },

  // Battle actions
  selectAction: (action) => {
    set((state) => {
      const existingIndex = state.battleState.selectedActions.findIndex(
        (a) => a.slotId === action.slotId
      );

      let newActions: SelectedAction[];
      if (existingIndex >= 0) {
        newActions = [...state.battleState.selectedActions];
        newActions[existingIndex] = action;
      } else {
        newActions = [...state.battleState.selectedActions, action];
      }

      return {
        battleState: {
          ...state.battleState,
          selectedActions: newActions,
        },
      };
    });
  },

  clearAction: (slotId) => {
    set((state) => ({
      battleState: {
        ...state.battleState,
        selectedActions: state.battleState.selectedActions.filter(
          (a) => a.slotId !== slotId
        ),
      },
    }));
  },

  executeTurn: () => {
    const state = get();
    // This will be implemented with the move executor
    console.log("Executing turn with actions:", state.battleState.selectedActions);
  },

  setTurnOrder: (order) => {
    set((state) => ({
      battleState: {
        ...state.battleState,
        turnOrder: order,
      },
    }));
  },

  // Field conditions
  setFieldConditions: (conditions) => {
    set((state) => ({
      battleState: {
        ...state.battleState,
        fieldConditions: { ...state.battleState.fieldConditions, ...conditions },
      },
    }));
  },

  toggleSideCondition: (side, key) => {
    set((state) => {
      const sideKey = side === "player" ? "playerSide" : "opponentSide";
      const conditions = state.battleState.fieldConditions[sideKey];

      // Handle boolean toggles
      if (typeof conditions[key] === "boolean") {
        return {
          battleState: {
            ...state.battleState,
            fieldConditions: {
              ...state.battleState.fieldConditions,
              [sideKey]: {
                ...conditions,
                [key]: !conditions[key],
              },
            },
          },
        };
      }
      return state;
    });
  },

  // Pokemon state updates
  updatePokemonHp: (slotId, newHp) => {
    set((state) => {
      const [side, position] = slotId.split("-") as [TeamSide, SlotPosition];
      const teamKey = side === "player" ? "playerTeam" : "opponentTeam";
      const team = state.battleState[teamKey];

      const pokemonIndex = team.pokemon.findIndex(
        (p) => p?.slotPosition === Number(position) as SlotPosition
      );
      if (pokemonIndex < 0) return state;

      const pokemon = team.pokemon[pokemonIndex];
      if (!pokemon) return state;

      const clampedHp = Math.max(0, Math.min(newHp, pokemon.maxHp));
      const newPokemon = [...team.pokemon];
      newPokemon[pokemonIndex] = {
        ...pokemon,
        currentHp: clampedHp,
        isFainted: clampedHp === 0,
      };

      return {
        battleState: {
          ...state.battleState,
          [teamKey]: { ...team, pokemon: newPokemon },
        },
      };
    });
  },

  applyDamage: (slotId, damage) => {
    const state = get();
    const pokemon = state.getPokemonAtSlot(slotId);
    if (!pokemon) return;

    const newHp = pokemon.currentHp - damage;
    state.updatePokemonHp(slotId, newHp);
  },

  setPokemonStatus: (slotId, status) => {
    set((state) => {
      const [side, position] = slotId.split("-") as [TeamSide, SlotPosition];
      const teamKey = side === "player" ? "playerTeam" : "opponentTeam";
      const team = state.battleState[teamKey];

      const pokemonIndex = team.pokemon.findIndex(
        (p) => p?.slotPosition === Number(position) as SlotPosition
      );
      if (pokemonIndex < 0) return state;

      const pokemon = team.pokemon[pokemonIndex];
      if (!pokemon) return state;

      const newPokemon = [...team.pokemon];
      newPokemon[pokemonIndex] = {
        ...pokemon,
        status,
        statusTurns: status === "none" ? 0 : 1,
      };

      return {
        battleState: {
          ...state.battleState,
          [teamKey]: { ...team, pokemon: newPokemon },
        },
      };
    });
  },

  setPokemonStatBoost: (slotId, stat, value) => {
    set((state) => {
      const [side, position] = slotId.split("-") as [TeamSide, SlotPosition];
      const teamKey = side === "player" ? "playerTeam" : "opponentTeam";
      const team = state.battleState[teamKey];

      const pokemonIndex = team.pokemon.findIndex(
        (p) => p?.slotPosition === Number(position) as SlotPosition
      );
      if (pokemonIndex < 0) return state;

      const pokemon = team.pokemon[pokemonIndex];
      if (!pokemon) return state;

      const clampedValue = Math.max(-6, Math.min(6, value));
      const newPokemon = [...team.pokemon];
      newPokemon[pokemonIndex] = {
        ...pokemon,
        statBoosts: { ...pokemon.statBoosts, [stat]: clampedValue },
      };

      return {
        battleState: {
          ...state.battleState,
          [teamKey]: { ...team, pokemon: newPokemon },
        },
      };
    });
  },

  setPokemonItem: (slotId, item) => {
    set((state) => {
      const [side, position] = slotId.split("-") as [TeamSide, SlotPosition];
      const teamKey = side === "player" ? "playerTeam" : "opponentTeam";
      const team = state.battleState[teamKey];

      const pokemonIndex = team.pokemon.findIndex(
        (p) => p?.slotPosition === Number(position) as SlotPosition
      );
      if (pokemonIndex < 0) return state;

      const pokemon = team.pokemon[pokemonIndex];
      if (!pokemon) return state;

      const newPokemon = [...team.pokemon];
      newPokemon[pokemonIndex] = { ...pokemon, item };

      return {
        battleState: {
          ...state.battleState,
          [teamKey]: { ...team, pokemon: newPokemon },
        },
      };
    });
  },

  setPokemonAbility: (slotId, ability) => {
    set((state) => {
      const [side, position] = slotId.split("-") as [TeamSide, SlotPosition];
      const teamKey = side === "player" ? "playerTeam" : "opponentTeam";
      const team = state.battleState[teamKey];

      const pokemonIndex = team.pokemon.findIndex(
        (p) => p?.slotPosition === Number(position) as SlotPosition
      );
      if (pokemonIndex < 0) return state;

      const pokemon = team.pokemon[pokemonIndex];
      if (!pokemon) return state;

      const newPokemon = [...team.pokemon];
      newPokemon[pokemonIndex] = { ...pokemon, ability };

      return {
        battleState: {
          ...state.battleState,
          [teamKey]: { ...team, pokemon: newPokemon },
        },
      };
    });
  },

  setPokemonTeraType: (slotId, teraType) => {
    set((state) => {
      const [side, position] = slotId.split("-") as [TeamSide, SlotPosition];
      const teamKey = side === "player" ? "playerTeam" : "opponentTeam";
      const team = state.battleState[teamKey];

      const pokemonIndex = team.pokemon.findIndex(
        (p) => p?.slotPosition === Number(position) as SlotPosition
      );
      if (pokemonIndex < 0) return state;

      const pokemon = team.pokemon[pokemonIndex];
      if (!pokemon) return state;

      const newPokemon = [...team.pokemon];
      newPokemon[pokemonIndex] = { ...pokemon, teraType };

      return {
        battleState: {
          ...state.battleState,
          [teamKey]: { ...team, pokemon: newPokemon },
        },
      };
    });
  },

  // History management
  saveToHistory: () => {
    set((state) => {
      // Truncate any "future" history if we're not at the end
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(JSON.parse(JSON.stringify(state.battleState)));

      return {
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  undo: () => {
    set((state) => {
      if (state.historyIndex <= 0) return state;

      const newIndex = state.historyIndex - 1;
      return {
        battleState: JSON.parse(JSON.stringify(state.history[newIndex])),
        historyIndex: newIndex,
      };
    });
  },

  redo: () => {
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state;

      const newIndex = state.historyIndex + 1;
      return {
        battleState: JSON.parse(JSON.stringify(state.history[newIndex])),
        historyIndex: newIndex,
      };
    });
  },

  canUndo: () => {
    const state = get();
    return state.historyIndex > 0;
  },

  canRedo: () => {
    const state = get();
    return state.historyIndex < state.history.length - 1;
  },

  // Battle flow
  nextPhase: () => {
    set((state) => {
      const phases: BattleState["phase"][] = [
        "team-preview",
        "lead-selection",
        "action-selection",
        "turn-resolution",
        "battle-end",
      ];
      const currentIndex = phases.indexOf(state.battleState.phase);
      const nextPhase = phases[currentIndex + 1] || state.battleState.phase;

      return {
        battleState: {
          ...state.battleState,
          phase: nextPhase,
        },
      };
    });
  },

  resetBattle: () => {
    set({
      battleState: createInitialBattleState(),
      history: [],
      historyIndex: -1,
    });
  },

  // Helpers
  getActivePokemon: (side) => {
    const state = get();
    const team = side === "player" ? state.battleState.playerTeam : state.battleState.opponentTeam;
    return team.pokemon.filter((p) => p?.slotPosition !== null);
  },

  getBenchPokemon: (side) => {
    const state = get();
    const team = side === "player" ? state.battleState.playerTeam : state.battleState.opponentTeam;
    return team.pokemon.filter((p) => p?.slotPosition === null && !p?.isFainted);
  },

  getPokemonAtSlot: (slotId) => {
    const state = get();
    const [side, position] = slotId.split("-") as [TeamSide, SlotPosition];
    const team = side === "player" ? state.battleState.playerTeam : state.battleState.opponentTeam;
    return team.pokemon.find((p) => p?.slotPosition === Number(position) as SlotPosition) || null;
  },
}));