import { PlayableCharacterEntity } from "@/src/shared/entities";
import { create } from "zustand";

type PlayableCharacterState = {
  character: PlayableCharacterEntity;

  setCharacterData: (data: Partial<PlayableCharacterEntity>) => void;
};

export const PlayableCharacterStore = create<PlayableCharacterState>((set) => ({
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

  setCharacterData: (data) =>
    set((state) => ({ character: { ...state.character, ...data } })),
}));
