import { FONT_SIZE, SPACING } from "@/src/shared/constants/Tokens";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    overflow: "hidden",
  },

  content: {
    flex: 1,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: SPACING.m,
  },

  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "700",
  },

  avatarButton: {
    width: 42,
    height: 42,

    borderRadius: 999,

    alignItems: "center",
    justifyContent: "center",

    overflow: "hidden",
  },

  avatar: {
    width: "100%",
    height: "100%",
  },
});

export default styles;
