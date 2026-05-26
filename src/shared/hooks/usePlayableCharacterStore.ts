import { PlayableCharacterStore } from "../store/playableChracter/PlayableCharacter.store";

export const usePlayableCharacterStore = () => {
  const character = PlayableCharacterStore((s) => s.character);

  const setCharacterData = PlayableCharacterStore((s) => s.setCharacterData);
  const clearCharacterData = PlayableCharacterStore(
    (s) => s.clearCharacterData,
  );

  return {
    character,
    setCharacterData,
    clearCharacterData,
  };
};
