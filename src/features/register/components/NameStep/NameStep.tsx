import { useThemeStore } from "@/src/app-core/Store/themeStore";
import MainInput from "@/src/shared/ui/Inputs/MainInput/MainInput";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import styles from "./Styles";

const NameStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const colors = useThemeStore((state) => state.colors);

  return (
    <View style={styles.mainContainer}>
      <MainText variant="label">
        Vamos a darle nombre a tu personaje...
      </MainText>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <MainInput
            value={value}
            onChange={onChange}
            error={errors.name?.message?.toString()}
            variant="clear"
            placeholder="Arthur Reiss Atreides"
            leftIcon={
              <Feather name="user" size={24} color={colors.dark_border} />
            }
          />
        )}
      />
    </View>
  );
};

export default NameStep;
