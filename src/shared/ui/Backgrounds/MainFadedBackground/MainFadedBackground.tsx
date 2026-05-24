import { useThemeStore } from "@/src/app-core/Store/themeStore";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

const MainFadedBackground = () => {
  const colors = useThemeStore((state) => state.colors);
  return (
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
  );
};

export default MainFadedBackground;
