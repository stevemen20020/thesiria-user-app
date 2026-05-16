import { PlayableCharacterEntity, UsersEntity } from "@/src/shared/entities";
import { create } from "zustand";
import { CardLayout, RolledStat, StatKey } from "../types/register.types";

type CharacterCreationState = {
  stepIndex: number;
  totalSteps: number;

  character: PlayableCharacterEntity;
  statsArray: RolledStat[];

  hoveredStat: StatKey | null;

  cardLayouts: Record<StatKey, CardLayout>;
  usedRolls: Record<StatKey, string>;

  user: UsersEntity;

  setHoveredStat: (stat: StatKey | null) => void;
  setUsedRoll: (statKey: StatKey, rollId: string) => void;

  setCardLayout: (key: StatKey, layout: CardLayout) => void;

  nextStep: () => void;
  prevStep: () => void;
  setCharacterData: (data: Partial<PlayableCharacterEntity>) => void;
  setUserData: (data: Partial<UsersEntity>) => void;
  setStatsArray: (skillIndex: number, data: number) => void;
  deleteStat: (index: number) => void;
};

export const useRegisterstore = create<CharacterCreationState>((set) => ({
  stepIndex: 0,
  totalSteps: 0,

  character: {
    userId: "",
    name: "",
    biography: "",
    idRace: "",
    positiveCharacteristic_1: "",
    positiveCharacteristic_2: "",
    positiveCharacteristic_3: "",
    negativeCharacteristic_1: "",
    negativeCharacteristic_2: "",
    strength: "",
    dexterity: "",
    defense: "",
    aim: "",
    vision: "",
    speed: "",
    handcraft: "",
    agility: "",
    charisma: "",
    wisdom: "",
    affinityId: "",
    chroniclerStatus: "",
  },

  statsArray: [],
  usedRolls: {
    strength: "",
    dexterity: "",
    defense: "",
    aim: "",
    vision: "",
    speed: "",
    handcraft: "",
    agility: "",
    charisma: "",
    wisdom: "",
  },

  user: {
    email: "",
    password: "",
  },

  nextStep: () => set((state) => ({ stepIndex: state.stepIndex + 1 })),
  prevStep: () => set((state) => ({ stepIndex: state.stepIndex - 1 })),

  setCharacterData: (data) =>
    set((state) => ({ character: { ...state.character, ...data } })),

  setUserData: (data) => set((state) => ({ user: { ...state.user, ...data } })),

  setStatsArray: (skillIndex: number, data: number) => {
    set((state) => {
      const skills = [...state.statsArray];
      skills[skillIndex] = { id: `roll-${skillIndex}`, value: data };
      return { statsArray: skills };
    });
  },

  deleteStat: (index: number) => {
    set((state) => {
      const skills = [...state.statsArray];
      skills.splice(index, 1);
      return { statsArray: skills };
    });
  },

  hoveredStat: null,

  cardLayouts: {} as Record<StatKey, CardLayout>,

  setHoveredStat: (stat) =>
    set({
      hoveredStat: stat,
    }),

  setCardLayout: (key, layout) =>
    set((state) => ({
      cardLayouts: {
        ...state.cardLayouts,
        [key]: layout,
      },
    })),

  setUsedRoll: (statKey, rollId) =>
    set((state) => ({
      usedRolls: {
        ...state.usedRolls,
        [statKey]: rollId,
      },
    })),
}));
