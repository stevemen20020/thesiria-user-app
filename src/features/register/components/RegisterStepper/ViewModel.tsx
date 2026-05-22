import { useEffect } from "react";
import { Dimensions } from "react-native";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useRegister } from "../../hooks/useRegister";
import { useRegisterStore } from "../../hooks/useRegisterStore";
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
  const { stepIndex, nextStep, prevStep, character, user, statsArray } =
    useRegisterStore();
  const { registerAndLogin, error, isSuccess } = useRegister();
  const translateX = useSharedValue(0);
  const controlsOpacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  let Step;

  useEffect(() => {
    controlsOpacity.value = withTiming(stepIndex === 9 ? 0 : 1, {
      duration: 300,
    });

    if (stepIndex === 9) submitForm();
  }, [stepIndex]);

  switch (stepIndex) {
    case 0:
      Step = <NameStep />;
      break;
    case 1:
      Step = <RaceStep />;
      break;
    case 2:
      Step = <AffinityStep />;
      break;
    case 3:
      Step = <PositiveCharacteristicsStep />;
      break;
    case 4:
      Step = <NegativeCharecteristicsStep />;
      break;
    case 5:
      Step = <SkillsStep />;
      break;
    case 6:
      Step = <DeleteSkillStep />;
      break;
    case 7:
      Step = <AssignSkillStep />;
      break;
    case 8:
      Step = <UserRegisterStep />;
      break;
    case 9:
      Step = <AwaitScreenStep />;
      break;
    default:
      Step = <NameStep />;
  }

  const goNext = () => {
    translateX.value = withTiming(-SCREEN_WIDTH, { duration: 300 }, () => {
      runOnJS(nextStep)();

      translateX.value = SCREEN_WIDTH;

      translateX.value = withTiming(0, { duration: 300 });
    });
  };

  const controlsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: controlsOpacity.value,
  }));

  const goPrevious = () => {
    translateX.value = withTiming(SCREEN_WIDTH, { duration: 300 }, () => {
      runOnJS(prevStep)();
      translateX.value = -SCREEN_WIDTH;
      translateX.value = withTiming(0, { duration: 300 });
    });
  };

  const returnToLogin = () => {
    console.log("RETURNING...");
  };

  const blockNextButton = (): boolean => {
    switch (stepIndex) {
      case 0:
        return character.name === "" ? true : false;
      case 1:
        return character.idRace === "" ? true : false;
      case 2:
        return character.affinityId === "" ? true : false;
      case 3:
        return character.positiveCharacteristic_3 === "" ? true : false;
      case 4:
        return character.negativeCharacteristic_2 === "" ? true : false;
      case 5:
        return statsArray.length < 11 ? true : false;
      case 6:
        return statsArray.length < 10 ? true : false;
      case 7:
        if (
          character.strength === "" ||
          character.defense === "" ||
          character.dexterity === "" ||
          character.aim === "" ||
          character.agility === "" ||
          character.handcraft === "" ||
          character.charisma === "" ||
          character.wisdom === "" ||
          character.speed === "" ||
          character.vision === ""
        )
          return true;
        else return false;
      case 8:
        if (user.email === "" || user.password === "") return true;
        else return false;
      default:
        return false;
    }
  };

  const submitForm = () => {
    registerAndLogin({ user, character });
  };

  if (isSuccess) console.log("TODO: CREATE WELCOME TO THESIRIA SCREEN");

  return {
    Step,
    animatedStyle,
    controlsAnimatedStyle,
    stepIndex,
    goPrevious,
    goNext,
    returnToLogin,
    blockNextButton,
  };
};

export default RegisterStepperViewModel;
