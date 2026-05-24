import { SPACING } from "@/src/shared/constants/Tokens";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: "100%",
    gap: SPACING.xl,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  cardContainer: {
    width: 280,
    display: "flex",
    flexDirection: "column",
    gap: SPACING.xxl,
    paddingVertical: SPACING.xxxl,
  },

  logo: {
    width: 240,
    height: 120,
  },

  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
