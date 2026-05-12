import { SPACING } from "@/src/shared/constants/Tokens";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
    height: "100%",
    gap: SPACING.s,
  },

  paddedContainer: {
    width: "100%",
    paddingHorizontal: SPACING.s,
    paddingTop: SPACING.l,
    height: "10%",
  },

  // 🔥 This makes it expand
  animatedContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },

  // 🔥 Floating button
  bottomContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: SPACING.s,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: SPACING.m,
    paddingBottom: SPACING.xl,
  },
});

export default styles;
