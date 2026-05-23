import { useState } from "react";
import { useRegisterStore } from "../../hooks/useRegisterStore";

const ViewModel = () => {
  const [skillIndex, setSkillIndex] = useState<number>(0);

  const { statsArray, setStatsArray } = useRegisterStore();

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    setStatsArray(skillIndex, randomNumber);
  };

  const pressNumber = () => {
    if (!statsArray[skillIndex]) {
      const randomNumber = Math.floor(Math.random() * 20) + 1;
      setStatsArray(skillIndex, randomNumber);
    }
    setSkillIndex((prev) => prev + 1);
  };

  return {
    statsArray,
    skillIndex,
    generateRandomNumber,
    setSkillIndex,
    pressNumber,
  };
};

export default ViewModel;
