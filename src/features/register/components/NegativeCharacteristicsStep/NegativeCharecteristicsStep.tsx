import { useThemeStore } from "@/src/app-core/Store/themeStore";
import MainInput from "@/src/shared/ui/Inputs/MainInput/MainInput";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { View } from "react-native";
import { useRegister } from "../../hooks/useRegister";
import styles from "./Styles";
const NegativeCharecteristicsStep = () => {
  const { character, setCharacterData } = useRegister();

  const colors = useThemeStore((state) => state.colors);

  return (
    <View style={styles.mainContainer}>
      <MainText variant="label">
        Escribe una caracteristica negativa de tu personaje
      </MainText>

      <MainInput
        value={character.negativeCharacteristic_1 ?? ""}
        onChange={(text: string) =>
          setCharacterData({ negativeCharacteristic_2: text })
        }
        variant="clear"
        placeholder="Le tiene fobia al color amarillo"
        leftIcon={
          <MaterialCommunityIcons
            name="emoticon-devil-outline"
            size={24}
            color={colors.dark_border}
          />
        }
      />
      <MainText variant="label">
        (Escoge un compañero para que escriba la siguiente)
      </MainText>
      <MainInput
        value={character.negativeCharacteristic_2 ?? ""}
        onChange={(text: string) =>
          setCharacterData({ negativeCharacteristic_2: text })
        }
        variant="clear"
        placeholder="Es extremadamente R A C I S T A"
        leftIcon={
          <MaterialCommunityIcons
            name="emoticon-devil-outline"
            size={24}
            color={colors.dark_border}
          />
        }
      />
    </View>
  );
};

export default NegativeCharecteristicsStep;
