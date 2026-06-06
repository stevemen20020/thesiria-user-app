import { useThemeStore } from "@/src/app-core/Store/themeStore";
import MainInput from "@/src/shared/ui/Inputs/MainInput/MainInput";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import styles from "./Styles";

const PositiveCharacteristicsStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const colors = useThemeStore((state) => state.colors);

  return (
    <View style={styles.mainContainer}>
      <MainText variant="label">
        Escribe una caracteristica positiva de tu personaje
      </MainText>

      <Controller
        control={control}
        name="positiveCharacteristic_1"
        render={({ field: { onChange, value } }) => (
          <MainInput
            value={value}
            onChange={onChange}
            variant="clear"
            placeholder="Es extremadamente amable"
            leftIcon={
              <AntDesign
                name="check-circle"
                size={24}
                color={colors.dark_border}
              />
            }
            error={errors.positiveCharacteristic_1?.message?.toString()}
          />
        )}
      />
      <MainText variant="label">
        (Escoge dos compañeros para que escriban las siguientes dos)
      </MainText>
      <Controller
        control={control}
        name="positiveCharacteristic_2"
        render={({ field: { onChange, value } }) => (
          <MainInput
            value={value}
            onChange={onChange}
            variant="clear"
            placeholder="Tiene un gran talento para cantar"
            leftIcon={
              <AntDesign
                name="check-circle"
                size={24}
                color={colors.dark_border}
              />
            }
            error={errors.positiveCharacteristic_2?.message?.toString()}
          />
        )}
      />
      <Controller
        control={control}
        name="positiveCharacteristic_3"
        render={({ field: { onChange, value } }) => (
          <MainInput
            value={value}
            onChange={onChange}
            variant="clear"
            placeholder="Caga muy regularmente"
            leftIcon={
              <AntDesign
                name="check-circle"
                size={24}
                color={colors.dark_border}
              />
            }
            error={errors.positiveCharacteristic_3?.message?.toString()}
          />
        )}
      />
    </View>
  );
};

export default PositiveCharacteristicsStep;
