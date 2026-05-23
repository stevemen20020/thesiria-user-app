import { Registerstore } from "../store/register.store";

export function useRegisterStore() {
  const stepIndex = Registerstore((s) => s.stepIndex);
  const totalSteps = Registerstore((s) => s.totalSteps);
  const character = Registerstore((s) => s.character);
  const statsArray = Registerstore((s) => s.statsArray);
  const hoveredStat = Registerstore((s) => s.hoveredStat);
  const cardLayouts = Registerstore((s) => s.cardLayouts);
  const usedRolls = Registerstore((s) => s.usedRolls);
  const user = Registerstore((s) => s.user);

  const nextStep = Registerstore((s) => s.nextStep);
  const prevStep = Registerstore((s) => s.prevStep);
  const setCharacterData = Registerstore((s) => s.setCharacterData);
  const setStatsArray = Registerstore((s) => s.setStatsArray);
  const deleteSkill = Registerstore((s) => s.deleteStat);
  const setHoveredStat = Registerstore((s) => s.setHoveredStat);
  const setCardLayout = Registerstore((s) => s.setCardLayout);
  const setUsedRoll = Registerstore((s) => s.setUsedRoll);
  const setUserData = Registerstore((s) => s.setUserData);

  return {
    stepIndex,
    totalSteps,
    character,
    statsArray,
    hoveredStat,
    cardLayouts,
    usedRolls,
    user,
    nextStep,
    prevStep,
    setCharacterData,
    setStatsArray,
    deleteSkill,
    setHoveredStat,
    setCardLayout,
    setUsedRoll,
    setUserData,
  };
}
