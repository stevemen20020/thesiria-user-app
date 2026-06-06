import { useThemeStore } from "@/src/app-core/Store/themeStore";
import MainInput from "@/src/shared/ui/Inputs/MainInput/MainInput";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import styles from "./Styles";
const NegativeCharecteristicsStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const colors = useThemeStore((state) => state.colors);

  return (
    <View style={styles.mainContainer}>
      <MainText variant="label">
        Escribe una caracteristica negativa de tu personaje
      </MainText>

      <Controller
        control={control}
        name="negativeCharacteristic_1"
        render={({ field: { onChange, value } }) => (
          <MainInput
            value={value}
            onChange={onChange}
            variant="clear"
            placeholder="Le tiene fobia al color amarillo"
            leftIcon={
              <MaterialCommunityIcons
                name="emoticon-devil-outline"
                size={24}
                color={colors.dark_border}
              />
            }
            error={errors.negativeCharacteristic_1?.message?.toString()}
          />
        )}
      />
      <MainText variant="label">
        (Escoge un compañero para que escriba la siguiente)
      </MainText>
      <Controller
        control={control}
        name="negativeCharacteristic_2"
        render={({ field: { onChange, value } }) => (
          <MainInput
            value={value}
            onChange={onChange}
            variant="clear"
            placeholder="Es extremadamente R A C I S T A"
            leftIcon={
              <MaterialCommunityIcons
                name="emoticon-devil-outline"
                size={24}
                color={colors.dark_border}
              />
            }
            error={errors.negativeCharacteristic_2?.message?.toString()}
          />
        )}
      />
    </View>
  );
};

export default NegativeCharecteristicsStep;
