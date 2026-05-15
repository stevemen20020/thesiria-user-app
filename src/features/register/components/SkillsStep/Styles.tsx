import { SPACING } from "@/src/shared/constants/Tokens";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingHorizontal: SPACING.s,
    gap: SPACING.s,
    flex: 1,
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: SPACING.xs,
    flexWrap: "wrap",
    flex: 1,
  },
});

export default styles;
