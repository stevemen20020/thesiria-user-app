import { useThemeStore } from "@/src/app-core/Store/themeStore";
import MainFadedBackground from "@/src/shared/ui/Backgrounds/MainFadedBackground/MainFadedBackground";
import GoBackButton from "@/src/shared/ui/Buttons/GoBackButton";
import IconButton from "@/src/shared/ui/Buttons/IconButton/IconButton";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import * as Progress from "react-native-progress";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Styles";
import useViewModel from "./ViewModel";

const RegisterStepper = () => {
  const {
    Step,
    animatedStyle,
    stepIndex,
    controlsAnimatedStyle,
    goNext,
    returnToLogin,
    goPrevious,
    blockNextButton,
  } = useViewModel();
  const colors = useThemeStore((state) => state.colors);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainFadedBackground />

      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Animated.View style={[styles.paddedContainer, controlsAnimatedStyle]}>
          <GoBackButton
            onPress={returnToLogin}
            icon={
              <Feather name="arrow-left" size={24} color={colors.textPrimary} />
            }
          />
        </Animated.View>
        <Animated.View style={[styles.paddedContainer, controlsAnimatedStyle]}>
          <Progress.Bar
            progress={stepIndex / 9}
            animated={true}
            color={colors.primary}
            borderColor="transparent"
            width={null}
          />
        </Animated.View>

        <Animated.View style={[styles.animatedContainer, animatedStyle]}>
          {Step}
        </Animated.View>

        <Animated.View style={[styles.bottomContainer, controlsAnimatedStyle]}>
          <IconButton
            icon={
              <Feather
                name="arrow-left"
                size={24}
                color={stepIndex === 0 ? colors.disabled : colors.primary}
              />
            }
            variant={stepIndex === 0 ? "ghost" : "outline"}
            onPress={goPrevious}
            text="REGRESAR"
            disabled={stepIndex === 0 ? true : false}
          />

          <IconButton
            icon={
              <Feather
                name="arrow-right"
                size={24}
                color={
                  blockNextButton() ? colors.disabled : colors.textOnPrimary
                }
              />
            }
            variant="filled"
            onPress={goNext}
            disabled={blockNextButton()}
          />
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterStepper;
