import { useThemeStore } from "@/src/app-core/Store/themeStore";
import MainInput from "@/src/shared/ui/Inputs/MainInput/MainInput";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { View } from "react-native";
import { useRegisterStore } from "../../hooks/useRegisterStore";
import styles from "./Styles";

const PositiveCharacteristicsStep = () => {
  const { character, setCharacterData } = useRegisterStore();

  const colors = useThemeStore((state) => state.colors);

  return (
    <View style={styles.mainContainer}>
      <MainText variant="label">
        Escribe una caracteristica positiva de tu personaje
      </MainText>

      <MainInput
        value={character.positiveCharacteristic_1 ?? ""}
        onChange={(text: string) =>
          setCharacterData({ positiveCharacteristic_1: text })
        }
        variant="clear"
        placeholder="Es extremadamente amable"
        leftIcon={
          <AntDesign name="check-circle" size={24} color={colors.dark_border} />
        }
      />
      <MainText variant="label">
        (Escoge dos compañeros para que escriban las siguientes dos)
      </MainText>
      <MainInput
        value={character.positiveCharacteristic_2 ?? ""}
        onChange={(text: string) =>
          setCharacterData({ positiveCharacteristic_2: text })
        }
        variant="clear"
        placeholder="Gusta de adoptar gatos perdidos"
        leftIcon={
          <AntDesign name="check-circle" size={24} color={colors.dark_border} />
        }
      />
      <MainInput
        value={character.positiveCharacteristic_3 ?? ""}
        onChange={(text: string) =>
          setCharacterData({ positiveCharacteristic_3: text })
        }
        variant="clear"
        placeholder="Por mas que lo intente, no le pueden oler las patas"
        leftIcon={
          <AntDesign name="check-circle" size={24} color={colors.dark_border} />
        }
      />
    </View>
  );
};

export default PositiveCharacteristicsStep;
