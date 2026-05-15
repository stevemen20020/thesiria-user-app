import { Dimensions } from "react-native";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useRegister } from "../../hooks/useRegister";
import AffinityStep from "../AffinityStep/AffinityStep";
import AssignSkillStep from "../AssignSkillStep/AssignSkillStep";
import DeleteSkillStep from "../DeleteSkillStep/DeleteSkillStep";
import NameStep from "../NameStep/NameStep";
import NegativeCharecteristicsStep from "../NegativeCharacteristicsStep/NegativeCharecteristicsStep";
import PositiveCharacteristicsStep from "../PositiveCharacteristicsStep/PositiveCharacteristicsStep";
import RaceStep from "../RaceStep/RaceStep";
import SkillsStep from "../SkillsStep/SkillsStep";

const SCREEN_WIDTH = Dimensions.get("window").width;

const RegisterStepperViewModel = () => {
  const { stepIndex, nextStep, prevStep, character, statsArray } =
    useRegister();
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  let Step;

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
      default:
        return false;
    }
  };

  return {
    goNext,
    Step,
    goPrevious,
    animatedStyle,
    stepIndex,
    returnToLogin,
    blockNextButton,
  };
};

export default RegisterStepperViewModel;
