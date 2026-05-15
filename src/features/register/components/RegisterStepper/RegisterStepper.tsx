import { useThemeStore } from "@/src/app-core/Store/themeStore";
import GoBackButton from "@/src/shared/ui/Buttons/GoBackButton";
import IconButton from "@/src/shared/ui/Buttons/IconButton/IconButton";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
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
    goNext,
    returnToLogin,
    goPrevious,
    blockNextButton,
  } = useViewModel();
  const colors = useThemeStore((state) => state.colors);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.paddedContainer}>
          <GoBackButton
            onPress={returnToLogin}
            icon={
              <Feather name="arrow-left" size={24} color={colors.textPrimary} />
            }
          />
        </View>
        <View style={styles.paddedContainer}>
          <Progress.Bar
            progress={stepIndex / 8}
            animated={true}
            color={colors.primary}
            borderColor="transparent"
            width={null}
          />
        </View>

        <Animated.View style={[styles.animatedContainer, animatedStyle]}>
          {Step}
        </Animated.View>

        <View style={styles.bottomContainer}>
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
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterStepper;
