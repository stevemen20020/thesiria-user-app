import { SPACING } from "@/src/shared/constants/Tokens";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingHorizontal: SPACING.s,
    gap: SPACING.l,
  },
});

export default styles;
