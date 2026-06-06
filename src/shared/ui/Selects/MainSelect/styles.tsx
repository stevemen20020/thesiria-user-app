import { FONT_SIZE } from "@/src/shared/constants/Tokens";
import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    wrapper: {
      width: "100%",
    },
    pickerWrapper: {
      width: "100%",
      borderWidth: 1,
      borderRadius: 12,
      overflow: "hidden",
      minHeight: 48,
      justifyContent: "center",
    },
    picker: {
      width: "100%",
      height: 50,
    },
    trigger: {
      minHeight: 48,
      borderWidth: 1,
      borderRadius: 12,
      paddingLeft: 12,
      paddingRight: 36,
      paddingVertical: 10,
      justifyContent: "center",
      position: "relative",
    },
    disabled: {
      opacity: 0.6,
    },
    selectedDisplay: {
      flex: 1,
      justifyContent: "center",
    },
    placeholderText: {
      fontSize: 16,
    },
    chevron: {
      position: "absolute",
      right: 12,
      top: "50%",
      marginTop: -8,
      fontSize: 14,
      color: colors.textSecondary,
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.15)",
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    dropdown: {
      maxHeight: 350,
      borderWidth: 1,
      borderRadius: 12,
      overflow: "hidden",
    },
    option: {
      paddingVertical: 14,
      paddingHorizontal: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    selectedOption: {
      backgroundColor: colors.secondary,
    },
    optionText: {
      fontSize: 16,
    },
    checkIcon: {
      color: colors.primary,
      fontSize: 18,
      fontWeight: "700",
    },
    pill: {
      alignSelf: "flex-start",
      backgroundColor: colors.primary,
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 6,
    },
    pillText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "500",
    },
    doneButton: {
      padding: 14,
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: "#e5e7eb",
    },
    doneButtonText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: "600",
    },
    error: {
      fontSize: FONT_SIZE.xs,
    },
  });
