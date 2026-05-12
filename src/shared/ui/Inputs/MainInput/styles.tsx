import { FONT_SIZE, RADIUS, SPACING } from "@/src/shared/constants/Tokens";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  wrapper: {
    width: "100%",
    gap: SPACING.xxs,
  },

  label: {
    fontSize: FONT_SIZE.s,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  // 🔻 CLEAR VARIANT
  clearContainer: {
    borderBottomWidth: 1,
    paddingVertical: SPACING.xxs,
  },

  // 🔳 FILLED VARIANT
  filledContainer: {
    borderWidth: 1,
    borderRadius: RADIUS.m,
    paddingHorizontal: SPACING.s,
    paddingVertical: SPACING.xs,
  },

  input: {
    flex: 1,
  },

  icon: {
    marginHorizontal: SPACING.xxs,
  },

  error: {
    fontSize: FONT_SIZE.xs,
  },

  disabled: {
    opacity: 0.5,
  },
});

export default styles;
