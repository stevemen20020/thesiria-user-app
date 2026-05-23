import { useThemeStore } from "@/src/app-core/Store/themeStore";
import GoBackButton from "@/src/shared/ui/Buttons/GoBackButton";
import IconButton from "@/src/shared/ui/Buttons/IconButton/IconButton";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
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
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={[colors.background, colors.surface]}
          style={[StyleSheet.absoluteFill, { opacity: 1 }]}
        />

        <View
          style={{
            position: "absolute",
            width: 250,
            height: 250,
            borderRadius: 999,
            backgroundColor: colors.primary,
            opacity: 0.08,
            top: -80,
            right: -60,
          }}
        />

        <View
          style={{
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: 999,
            backgroundColor: colors.secondary,
            opacity: 0.06,
            bottom: 40,
            left: -50,
          }}
        />

        <View
          style={{
            position: "absolute",
            width: 80,
            height: 80,
            borderRadius: 999,
            backgroundColor: colors.primary,
            opacity: 0.04,
            top: "45%",
            right: 30,
          }}
        />
      </View>

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
