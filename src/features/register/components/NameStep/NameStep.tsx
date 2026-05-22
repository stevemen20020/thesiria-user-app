import { useThemeStore } from "@/src/app-core/Store/themeStore";
import MainInput from "@/src/shared/ui/Inputs/MainInput/MainInput";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { View } from "react-native";
import { useRegisterStore } from "../../hooks/useRegisterStore";
import styles from "./Styles";

const NameStep = () => {
  const { character, setCharacterData } = useRegisterStore();

  const colors = useThemeStore((state) => state.colors);

  return (
    <View style={styles.mainContainer}>
      <MainText variant="label">
        Vamos a darle nombre a tu personaje...
      </MainText>
      <MainInput
        value={character.name}
        onChange={(text: string) => setCharacterData({ name: text })}
        variant="clear"
        placeholder="Arthur Reiss Atreides"
        leftIcon={<Feather name="user" size={24} color={colors.dark_border} />}
      />
    </View>
  );
};

export default NameStep;
