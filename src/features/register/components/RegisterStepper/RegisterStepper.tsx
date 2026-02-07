import React from "react";
import { Button, Dimensions, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRegister } from "../../hooks/useRegister";
import AffinityStep from "../AffinityStep/AffinityStep";
import NameStep from "../NameStep/NameStep";
import NegativeCharecteristicsStep from "../NegativeCharacteristicsStep/NegativeCharecteristicsStep";
import PositiveCharacteristicsStep from "../PositiveCharacteristicsStep/PositiveCharacteristicsStep";
import RaceStep from "../RaceStep/RaceStep";
import SkillsStep from "../SkillsStep/SkillsStep";

const SCREEN_WIDTH = Dimensions.get("window").width;

const RegisterStepper = () => {
  const { stepIndex, nextStep } = useRegister();
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const Step = () => {
    switch (stepIndex) {
      case 0:
        return <NameStep />;
      case 1:
        return <RaceStep />;
      case 2:
        return <AffinityStep />;
      case 3:
        return <PositiveCharacteristicsStep />;
      case 4:
        return <NegativeCharecteristicsStep />;
      case 5:
        return <SkillsStep />;
      default:
        return <NameStep />;
    }
  };

  const goNext = () => {
    // 1️⃣ Saca el step actual hacia la izquierda
    translateX.value = withTiming(-SCREEN_WIDTH, { duration: 300 }, () => {
      // 2️⃣ Cambia el step (en JS)
      runOnJS(nextStep)();

      // 3️⃣ Coloca el nuevo step fuera a la derecha
      translateX.value = SCREEN_WIDTH;

      // 4️⃣ Anímalo al centro
      translateX.value = withTiming(0, { duration: 300 });
    });
  };

  return (
    <SafeAreaView>
      <View>
        <Animated.View style={[animatedStyle]}>
          <Step />
        </Animated.View>

        <Button title="Go next" onPress={goNext} />
      </View>
    </SafeAreaView>
  );
};

export default RegisterStepper;
