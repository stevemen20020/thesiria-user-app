import { Dimensions } from "react-native";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useRegister } from "../../hooks/useRegister";
import AffinityStep from "../AffinityStep/AffinityStep";
import NameStep from "../NameStep/NameStep";
import NegativeCharecteristicsStep from "../NegativeCharacteristicsStep/NegativeCharecteristicsStep";
import PositiveCharacteristicsStep from "../PositiveCharacteristicsStep/PositiveCharacteristicsStep";
import RaceStep from "../RaceStep/RaceStep";
import SkillsStep from "../SkillsStep/SkillsStep";

const SCREEN_WIDTH = Dimensions.get("window").width;

const RegisterStepperViewModel = () => {
  const { stepIndex, nextStep, prevStep } = useRegister();
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

  return { goNext, Step, goPrevious, animatedStyle, stepIndex, returnToLogin };
};

export default RegisterStepperViewModel;
