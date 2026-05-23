import { StyleSheet } from "react-native";

import { SPACING } from "@/src/shared/constants/Tokens";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.s,
    gap: SPACING.s,
  },

  pillsWrapper: {
    minHeight: 90,

    justifyContent: "center",
  },

  pillsContent: {
    paddingHorizontal: SPACING.s,

    gap: SPACING.xs,

    alignItems: "center",
  },

  cardsGrid: {
    flexDirection: "row",

    flexWrap: "wrap",

    paddingHorizontal: SPACING.s,

    gap: SPACING.s,
  },
});

export default styles;
