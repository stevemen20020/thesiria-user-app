import { useRegisterstore } from "../store/register.store";

export function useRegister() {
  const stepIndex = useRegisterstore((s) => s.stepIndex);
  const totalSteps = useRegisterstore((s) => s.totalSteps);
  const character = useRegisterstore((s) => s.character);

  const nextStep = useRegisterstore((s) => s.nextStep);
  const prevStep = useRegisterstore((s) => s.prevStep);
  const setCharacterData = useRegisterstore((s) => s.setCharacterData);

  return {
    stepIndex,
    totalSteps,
    character,
    nextStep,
    prevStep,
    setCharacterData,
  };
}
