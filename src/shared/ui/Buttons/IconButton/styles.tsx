import { FONT_SIZE, RADIUS, SPACING } from "@/src/shared/constants/Tokens";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  base: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RADIUS.round,
  },

  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xxs,
    padding: SPACING.xs,
  },

  text: {
    fontSize: FONT_SIZE.m,
  },

  disabled: {
    opacity: 0.5,
  },
});

export default styles;
