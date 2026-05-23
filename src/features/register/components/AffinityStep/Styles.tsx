import { SPACING } from "@/src/shared/constants/Tokens";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingHorizontal: SPACING.s,
    gap: SPACING.xs,
  },
});

export default styles;
