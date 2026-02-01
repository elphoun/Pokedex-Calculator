import { create } from "zustand";
import type {
  FieldConditions,
  Pokemon,
  PokemonState,
  StatusCondition,
  StatBoosts,
  Stats,
  PokemonType,
  SideConditions,
} from "../types";

interface BattleState {
  // Field conditions
  fieldConditions: FieldConditions;
  setFieldConditions: (conditions: Partial<FieldConditions>) => void;
  resetFieldConditions: () => void;
  toggleAttackerSideCondition: (key: keyof SideConditions) => void;
  toggleDefenderSideCondition: (key: keyof SideConditions) => void;

  // Player/Attacker Pokemon State
  attacker: PokemonState;
  setAttackerPokemon: (pokemon: Pokemon | null) => void;
  setAttackerStatus: (status: StatusCondition) => void;
  setAttackerStatBoost: (stat: keyof StatBoosts, value: number) => void;
  setAttackerItem: (item: string | null) => void;
  setAttackerAbility: (ability: string | null) => void;
  setAttackerLevel: (level: number) => void;
  setAttackerEVs: (evs: Partial<Stats>) => void;
  setAttackerIVs: (ivs: Partial<Stats>) => void;
  setAttackerNature: (nature: string | null) => void;
  setAttackerTeraType: (teraType: PokemonType | null) => void;
  resetAttacker: () => void;

  // Defender Pokemon State
  defender: PokemonState;
  setDefenderPokemon: (pokemon: Pokemon | null) => void;
  setDefenderStatus: (status: StatusCondition) => void;
  setDefenderStatBoost: (stat: keyof StatBoosts, value: number) => void;
  setDefenderItem: (item: string | null) => void;
  setDefenderAbility: (ability: string | null) => void;
  setDefenderLevel: (level: number) => void;
  setDefenderEVs: (evs: Partial<Stats>) => void;
  setDefenderIVs: (ivs: Partial<Stats>) => void;
  setDefenderNature: (nature: string | null) => void;
  setDefenderTeraType: (teraType: PokemonType | null) => void;
  resetDefender: () => void;
}

const defaultSideConditions: SideConditions = {
  reflect: false,
  lightScreen: false,
  tailwind: false,
  stealthRock: false,
};

const defaultFieldConditions: FieldConditions = {
  weather: "none",
  terrain: "none",
  trickRoom: false,
  wonderRoom: false,
  magicRoom: false,
  tailwind: false,
  reflect: false,
  lightScreen: false,
  auroraVeil: false,
  gravity: false,
  attackerSideConditions: { ...defaultSideConditions },
  defenderSideConditions: { ...defaultSideConditions },
};

const defaultStatBoosts: StatBoosts = {
  atk: 0,
  def: 0,
  spa: 0,
  spd: 0,
  spe: 0,
};

const defaultStats: Stats = {
  hp: 31,
  atk: 31,
  def: 31,
  spa: 31,
  spd: 31,
  spe: 31,
};

const defaultEVs: Stats = {
  hp: 0,
  atk: 0,
  def: 0,
  spa: 0,
  spd: 0,
  spe: 0,
};

const getInitialPokemonState = (): PokemonState => ({
  pokemon: null,
  status: "none",
  statBoosts: { ...defaultStatBoosts },
  item: null,
  ability: null,
  level: 50,
  evs: { ...defaultEVs },
  ivs: { ...defaultStats },
  nature: null,
  teraType: null,
});

export const useBattleStore = create<BattleState>((set) => ({
  // Field conditions state
  fieldConditions: defaultFieldConditions,
  setFieldConditions: (conditions) =>
    set((state) => ({
      fieldConditions: { ...state.fieldConditions, ...conditions },
    })),
  resetFieldConditions: () =>
    set({ fieldConditions: { ...defaultFieldConditions } }),
  toggleAttackerSideCondition: (key) =>
    set((state) => ({
      fieldConditions: {
        ...state.fieldConditions,
        attackerSideConditions: {
          ...state.fieldConditions.attackerSideConditions,
          [key]: !state.fieldConditions.attackerSideConditions[key],
        },
      },
    })),
  toggleDefenderSideCondition: (key) =>
    set((state) => ({
      fieldConditions: {
        ...state.fieldConditions,
        defenderSideConditions: {
          ...state.fieldConditions.defenderSideConditions,
          [key]: !state.fieldConditions.defenderSideConditions[key],
        },
      },
    })),

  // Attacker state
  attacker: getInitialPokemonState(),
  setAttackerPokemon: (pokemon) =>
    set((state) => ({ attacker: { ...state.attacker, pokemon } })),
  setAttackerStatus: (status) =>
    set((state) => ({ attacker: { ...state.attacker, status } })),
  setAttackerStatBoost: (stat, value) =>
    set((state) => ({
      attacker: {
        ...state.attacker,
        statBoosts: { ...state.attacker.statBoosts, [stat]: value },
      },
    })),
  setAttackerItem: (item) =>
    set((state) => ({ attacker: { ...state.attacker, item } })),
  setAttackerAbility: (ability) =>
    set((state) => ({ attacker: { ...state.attacker, ability } })),
  setAttackerLevel: (level) =>
    set((state) => ({ attacker: { ...state.attacker, level } })),
  setAttackerEVs: (evs) =>
    set((state) => ({
      attacker: { ...state.attacker, evs: { ...state.attacker.evs, ...evs } },
    })),
  setAttackerIVs: (ivs) =>
    set((state) => ({
      attacker: { ...state.attacker, ivs: { ...state.attacker.ivs, ...ivs } },
    })),
  setAttackerNature: (nature) =>
    set((state) => ({ attacker: { ...state.attacker, nature } })),
  setAttackerTeraType: (teraType) =>
    set((state) => ({ attacker: { ...state.attacker, teraType } })),
  resetAttacker: () => set({ attacker: getInitialPokemonState() }),

  // Defender state
  defender: getInitialPokemonState(),
  setDefenderPokemon: (pokemon) =>
    set((state) => ({ defender: { ...state.defender, pokemon } })),
  setDefenderStatus: (status) =>
    set((state) => ({ defender: { ...state.defender, status } })),
  setDefenderStatBoost: (stat, value) =>
    set((state) => ({
      defender: {
        ...state.defender,
        statBoosts: { ...state.defender.statBoosts, [stat]: value },
      },
    })),
  setDefenderItem: (item) =>
    set((state) => ({ defender: { ...state.defender, item } })),
  setDefenderAbility: (ability) =>
    set((state) => ({ defender: { ...state.defender, ability } })),
  setDefenderLevel: (level) =>
    set((state) => ({ defender: { ...state.defender, level } })),
  setDefenderEVs: (evs) =>
    set((state) => ({
      defender: { ...state.defender, evs: { ...state.defender.evs, ...evs } },
    })),
  setDefenderIVs: (ivs) =>
    set((state) => ({
      defender: { ...state.defender, ivs: { ...state.defender.ivs, ...ivs } },
    })),
  setDefenderNature: (nature) =>
    set((state) => ({ defender: { ...state.defender, nature } })),
  setDefenderTeraType: (teraType) =>
    set((state) => ({ defender: { ...state.defender, teraType } })),
  resetDefender: () => set({ defender: getInitialPokemonState() }),
}));
