import { ICON_SIZE } from "@/src/shared/constants/Tokens";
import IconButton from "@/src/shared/ui/Buttons/IconButton/IconButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { View } from "react-native";
import styles from "./styles";

const DiceButton = () => {
  return (
    <View style={styles.customButton}>
      <IconButton
        icon={<FontAwesome5 name="dice-d20" size={ICON_SIZE.l} color="white" />}
      />
    </View>
  );
};

export default DiceButton;
