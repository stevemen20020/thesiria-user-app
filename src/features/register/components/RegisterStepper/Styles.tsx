import { SPACING } from "@/src/shared/constants/Tokens";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: "100%",
    gap: SPACING.xxxl,
  },

  paddedContainer: {
    width: "100%",
    paddingHorizontal: SPACING.s,
    paddingTop: SPACING.l,
  },

  // 🔥 This makes it expand
  animatedContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },

  bottomContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: SPACING.s,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: SPACING.l,
    paddingBottom: SPACING.xl,
  },
});

export default styles;
