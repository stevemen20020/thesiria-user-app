import { useThemeStore } from "@/src/app-core/Store/themeStore";
import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import styles from "./styles";

interface MainInputProps {
  value: string;
  onChange: (text: string) => void;

  label?: string;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  variant?: "clear" | "filled";
  fontSize?: number;

  error?: string;
  disabled?: boolean;

  isPassword?: boolean;
}

const MainInput = ({
  value,
  onChange,
  label,
  leftIcon,
  rightIcon,
  variant = "clear",
  fontSize = 16,
  error,
  disabled = false,
  isPassword = false,
  placeholder,
}: MainInputProps) => {
  const colors = useThemeStore((state) => state.colors);

  const [isFocused, setIsFocused] = useState(false);
  const [secure, setSecure] = useState(isPassword);

  const isDisabled = disabled;

  // 🎨 dynamic colors
  const getTextColor = () => {
    if (isDisabled) return colors.disabled;
    if (isFocused) return colors.textPrimary;
    return colors.dark_border;
  };

  const getBorderColor = () => {
    if (isDisabled) return colors.border;
    if (error) return colors.error;

    if (variant === "clear") {
      return isFocused ? colors.primaryStrong : colors.dark_border;
    }

    if (variant === "filled") {
      return isFocused ? colors.secondary : "transparent";
    }

    return colors.border;
  };

  const getBackgroundColor = () => {
    if (variant === "filled") {
      return colors.surface;
    }
    return "transparent";
  };

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={[styles.label, { color: colors.textPrimary }]}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.container,
          variant === "clear" && styles.clearContainer,
          variant === "filled" && styles.filledContainer,
          {
            borderBottomColor: getBorderColor(),
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
          },
          isDisabled && styles.disabled,
        ]}
      >
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

        <TextInput
          value={value}
          onChangeText={onChange}
          editable={!isDisabled}
          secureTextEntry={secure}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={colors.disabled}
          style={[
            styles.input,
            {
              color: getTextColor(),
              fontSize,
            },
          ]}
          placeholder={placeholder}
        />

        {/* 🔥 Right side logic */}
        {isPassword ? (
          <Pressable onPress={() => setSecure((prev) => !prev)}>
            <Feather
              name={secure ? "eye-off" : "eye"}
              size={fontSize * 1.2}
              color={colors.textSecondary}
            />
          </Pressable>
        ) : (
          rightIcon && <View style={styles.icon}>{rightIcon}</View>
        )}
      </View>

      {error && (
        <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
      )}
    </View>
  );
};

export default MainInput;
