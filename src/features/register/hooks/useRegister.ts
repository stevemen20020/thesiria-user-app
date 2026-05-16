import { useRegisterstore } from "../store/register.store";

export function useRegister() {
  const stepIndex = useRegisterstore((s) => s.stepIndex);
  const totalSteps = useRegisterstore((s) => s.totalSteps);
  const character = useRegisterstore((s) => s.character);
  const statsArray = useRegisterstore((s) => s.statsArray);
  const hoveredStat = useRegisterstore((s) => s.hoveredStat);
  const cardLayouts = useRegisterstore((s) => s.cardLayouts);
  const usedRolls = useRegisterstore((s) => s.usedRolls);
  const user = useRegisterstore((s) => s.user);

  const nextStep = useRegisterstore((s) => s.nextStep);
  const prevStep = useRegisterstore((s) => s.prevStep);
  const setCharacterData = useRegisterstore((s) => s.setCharacterData);
  const setStatsArray = useRegisterstore((s) => s.setStatsArray);
  const deleteSkill = useRegisterstore((s) => s.deleteStat);
  const setHoveredStat = useRegisterstore((s) => s.setHoveredStat);
  const setCardLayout = useRegisterstore((s) => s.setCardLayout);
  const setUsedRoll = useRegisterstore((s) => s.setUsedRoll);
  const setUserData = useRegisterstore((s) => s.setUserData);

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
