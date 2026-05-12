import React, { ReactNode } from "react";
import { Text, TextStyle } from "react-native";
import styles from "./styles";

export type TextVariant = "body" | "label" | "caption" | "eyebrow";
export type FontSizeVariant = "xs" | "sm" | "md" | "lg" | "xl";
export type FontWeightVariant = "normal" | "medium" | "bold";

interface MainTextProps {
  children?: ReactNode;
  size?: FontSizeVariant;
  weight?: FontWeightVariant;
  color?: string;
  content?: string;
  upperCase?: boolean;
  italic?: boolean;
  variant?: TextVariant;
  textAlign?: string;
  numberOfLines?: number;
  style?: TextStyle | TextStyle[];
}

const fontSizesStyleMap: Record<FontSizeVariant, TextStyle> = {
  xs: { fontSize: 12 },
  sm: { fontSize: 14 },
  md: { fontSize: 16 },
  lg: { fontSize: 18 },
  xl: { fontSize: 20 },
};

const fontWeightStyleMap: Record<FontWeightVariant, TextStyle> = {
  normal: { fontWeight: "400" },
  medium: { fontWeight: "500" },
  bold: { fontWeight: "700" },
};

const defaultSizeByVariant: Record<TextVariant, FontSizeVariant> = {
  body: "md",
  label: "sm",
  caption: "sm",
  eyebrow: "xs",
};

const variantStyleMap: Record<TextVariant, TextStyle> = {
  body: {},
  label: {
    fontWeight: "700",
    color: "#6b7280",
  },
  caption: {
    color: "#6b7280",
  },
  eyebrow: {},
};

const MainText = ({
  children,
  size,
  weight = "normal",
  color,
  content,
  upperCase = false,
  italic = false,
  variant = "body",
  textAlign,
  numberOfLines,
  style,
}: MainTextProps) => {
  const resolvedSize = size || defaultSizeByVariant[variant];

  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode="tail"
      style={[
        styles.base,
        variantStyleMap[variant],
        fontSizesStyleMap[resolvedSize],
        fontWeightStyleMap[weight],
        upperCase && styles.upperCase,
        italic && styles.italic,
        color ? { color } : null,
        textAlign,
        style,
      ]}
    >
      {content || children}
    </Text>
  );
};

export default MainText;
