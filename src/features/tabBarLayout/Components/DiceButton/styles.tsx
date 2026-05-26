import { Z_INDEX } from "@/src/shared/constants/Tokens";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  customButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    width: 65,
    height: 65,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    zIndex: Z_INDEX.modal,
  },
});

export default styles;
