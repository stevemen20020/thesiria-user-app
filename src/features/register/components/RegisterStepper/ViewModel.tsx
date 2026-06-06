import { useGlobalLoader } from "@/src/shared/hooks/UseGlobalLoader";
import { router } from "expo-router";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Dimensions } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  mapRegisterFormToCharacter,
  mapRegisterFormToUser,
} from "../../helpers/register.form.mapper";
import { stepFields } from "../../helpers/register.steps";
import { useRegister } from "../../hooks/useRegister";
import { useRegisterStore } from "../../hooks/useRegisterStore";
import { RegisterFormType } from "../../schemas/register.schema";
import AffinityStep from "../AffinityStep/AffinityStep";
import AssignSkillStep from "../AssignSkillStep/AssignSkillStep";
import AwaitScreenStep from "../AwaitScreen/AwaitScreenStep";
import DeleteSkillStep from "../DeleteSkillStep/DeleteSkillStep";
import NameStep from "../NameStep/NameStep";
import NegativeCharecteristicsStep from "../NegativeCharacteristicsStep/NegativeCharecteristicsStep";
import PositiveCharacteristicsStep from "../PositiveCharacteristicsStep/PositiveCharacteristicsStep";
import RaceStep from "../RaceStep/RaceStep";
import SkillsStep from "../SkillsStep/SkillsStep";
import UserRegisterStep from "../UserRegister/UserRegister";

const SCREEN_WIDTH = Dimensions.get("window").width;

const RegisterStepperViewModel = () => {
  const {
    stepIndex,
    nextStep,
    prevStep,
    character,
    user,
    setCharacterData,
    setUserData,
  } = useRegisterStore();
  const { registerAndLogin, isPending, isSuccess } = useRegister();
  const { showLoader, hideLoader } = useGlobalLoader();
  const methods = useFormContext();

  const translateX = useSharedValue(0);
  const controlsOpacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  useEffect(() => {
    controlsOpacity.value = withTiming(stepIndex === 9 ? 0 : 1, {
      duration: 300,
    });

    if (stepIndex === 9 && !isPending && !isSuccess) {
      submitForm();
    }
  }, [stepIndex]);

  useEffect(() => {
    if (isSuccess) {
      hideLoader();
      requestAnimationFrame(() => {
        router.replace("/welcome");
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isPending) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [isPending]);

  const steps = [
    NameStep,
    RaceStep,
    AffinityStep,
    PositiveCharacteristicsStep,
    NegativeCharecteristicsStep,
    SkillsStep,
    DeleteSkillStep,
    AssignSkillStep,
    UserRegisterStep,
    AwaitScreenStep,
  ];

  const CurrentStep = steps[stepIndex] ?? NameStep;

  const validateAndGoNext = async () => {
    const fields = stepFields[stepIndex];

    if (!fields) {
      goNext();
      return;
    }

    const isValid = await methods.trigger(fields as any);

    if (!isValid) return;

    const values = methods.getValues() as RegisterFormType;

    const newCharacter = mapRegisterFormToCharacter(values);
    const newUser = mapRegisterFormToUser(values);

    console.log(
      "NEW",
      JSON.stringify(newCharacter, null, 4),
      JSON.stringify(newUser, null, 4),
    );

    setCharacterData(newCharacter);
    setUserData(newUser);

    goNext();
  };

  const goNext = () => {
    translateX.value = withTiming(-SCREEN_WIDTH, { duration: 300 });

    setTimeout(() => {
      handleNextStep();
    }, 300);
  };

  const handleNextStep = () => {
    nextStep();

    translateX.value = SCREEN_WIDTH;

    translateX.value = withTiming(0, { duration: 300 });
  };

  const controlsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: controlsOpacity.value,
  }));

  const goPrevious = () => {
    translateX.value = withTiming(SCREEN_WIDTH, { duration: 300 });

    setTimeout(() => {
      handlePreviousStep();
    }, 300);
  };

  const handlePreviousStep = () => {
    prevStep();

    translateX.value = -SCREEN_WIDTH;

    translateX.value = withTiming(0, { duration: 300 });
  };

  const returnToLogin = () => {
    router.back();
  };

  const submitForm = () => {
    console.log(
      "DATA SENT",
      JSON.stringify(user, null, 4),
      JSON.stringify(character, null, 4),
    );
    registerAndLogin({ user, character });
  };

  return {
    CurrentStep,
    animatedStyle,
    controlsAnimatedStyle,
    stepIndex,
    methods,
    goPrevious,
    validateAndGoNext,
    returnToLogin,
  };
};

export default RegisterStepperViewModel;
