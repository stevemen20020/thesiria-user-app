import { useThemeStore } from "@/src/app-core/Store/themeStore";
import { SPACING } from "@/src/shared/constants/Tokens";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import styles from "./styles";

interface IconButtonProps extends PressableProps {
  icon?: React.ReactNode;
  text?: string;
  children?: React.ReactNode;

  variant?: "filled" | "outline" | "ghost";
  size?: "s" | "m" | "l";

  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const IconButton = ({
  icon,
  text,
  children,
  onPress,
  variant = "filled",
  size = "m",
  loading = false,
  disabled = false,
  ...props
}: IconButtonProps) => {
  const colors = useThemeStore((state) => state.colors);

  // 🔥 press animation
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const getSizeStyle = (size: "s" | "m" | "l") => {
    switch (size) {
      case "s":
        return {
          padding: SPACING.xxs,
        };
      case "l":
        return {
          padding: SPACING.s,
        };
      case "m":
      default:
        return {
          padding: SPACING.xs,
        };
    }
  };

  const getTextStyle = (variant: string, colors: any, disabled: boolean) => {
    if (disabled) {
      return {
        color: colors.disabled,
      };
    }

    switch (variant) {
      case "outline":
        return {
          color: colors.textPrimary,
        };

      case "ghost":
        return {
          color: colors.textPrimary,
        };

      case "filled":
      default:
        return {
          color: colors.textOnPrimary,
        };
    }
  };

  const getVariantStyle = (variant: string, colors: any, disabled: boolean) => {
    if (disabled) {
      return {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.disabled,
        color: colors.disabled,
      };
    }

    switch (variant) {
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: colors.primary,
        };

      case "ghost":
        return {
          backgroundColor: "transparent",
        };

      case "filled":
      default:
        return {
          backgroundColor: colors.primary,
        };
    }
  };

  const variantStyle = getVariantStyle(variant, colors, disabled);
  const variantText = getTextStyle(variant, colors, disabled);
  const sizeStyle = getSizeStyle(size);

  return (
    <AnimatedPressable
      style={[styles.base, sizeStyle, variantStyle, animatedStyle]}
      disabled={disabled}
      onPress={onPress}
    >
      <Animated.View
        onTouchStart={handlePressIn}
        onTouchEnd={handlePressOut}
        {...props}
        style={styles.inner}
      >
        {loading ? (
          <ActivityIndicator color={colors.textOnPrimary} />
        ) : children ? (
          children
        ) : (
          <>
            {icon}
            {text && <Text style={(styles.text, variantText)}>{text}</Text>}
          </>
        )}
      </Animated.View>
    </AnimatedPressable>
  );
};

export default IconButton;
