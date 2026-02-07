import { PlayableCharacterEntity } from "@/src/shared/entities";
import { create } from "zustand";

type CharacterCreationState = {
  stepIndex: number;
  totalSteps: number;

  character: PlayableCharacterEntity;

  nextStep: () => void;
  prevStep: () => void;
  setCharacterData: (data: Partial<PlayableCharacterEntity>) => void;
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

  nextStep: () => set((state) => ({ stepIndex: state.stepIndex + 1 })),
  prevStep: () => set((state) => ({ stepIndex: state.stepIndex - 1 })),

  setCharacterData: (data) =>
    set((state) => ({ character: { ...state.character, ...data } })),
}));
