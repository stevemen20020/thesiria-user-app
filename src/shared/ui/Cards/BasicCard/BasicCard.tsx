import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

import { useThemeStore } from "@/src/app-core/Store/themeStore";
import { RADIUS, SPACING } from "@/src/shared/constants/Tokens";

interface CardProps extends PressableProps {
  children?: React.ReactNode;

  variant?: "filled" | "outline" | "ghost";
  size?: "s" | "m" | "l";

  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const BasicCard = ({
  children,
  variant = "filled",
  size = "m",

  style,
  contentStyle,
  onPress,

  ...props
}: CardProps) => {
  const colors = useThemeStore((state) => state.colors);

  const getSizeStyle = () => {
    switch (size) {
      case "s":
        return {
          padding: SPACING.s,
          borderRadius: RADIUS.s,
        };

      case "l":
        return {
          padding: SPACING.l,
          borderRadius: RADIUS.l,
        };

      case "m":
      default:
        return {
          padding: SPACING.m,
          borderRadius: RADIUS.m,
        };
    }
  };

  const getVariantStyle = () => {
    switch (variant) {
      case "outline":
        return {
          backgroundColor: colors.background,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 2,
        };

      case "ghost":
        return {
          backgroundColor: "transparent",
        };

      case "filled":
      default:
        return {
          backgroundColor: colors.surface,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 4,
        };
    }
  };

  const variantStyle = getVariantStyle();
  const sizeStyle = getSizeStyle();

  return (
    <Pressable
      style={[variantStyle, sizeStyle, style]}
      {...props}
      onPress={onPress}
    >
      <View
        style={[
          {
            width: "100%",
            gap: SPACING.s,
          },
          contentStyle,
        ]}
      >
        {children}
      </View>
    </Pressable>
  );
};

export default BasicCard;
