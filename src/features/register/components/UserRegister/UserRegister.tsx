import { useThemeStore } from "@/src/app-core/Store/themeStore";
import MainInput from "@/src/shared/ui/Inputs/MainInput/MainInput";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import styles from "./Styles";

const UserRegisterStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const colors = useThemeStore((state) => state.colors);

  return (
    <View style={styles.mainContainer}>
      <MainText variant="label">
        Finalmente, hay que crear una cuenta...
      </MainText>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <MainInput
            value={value}
            onChange={onChange}
            variant="clear"
            placeholder="example@user.com"
            leftIcon={
              <Feather name="user" size={24} color={colors.dark_border} />
            }
            error={errors.email?.message?.toString()}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <MainInput
            value={value}
            onChange={onChange}
            variant="clear"
            placeholder="Woowiiiwooooo i am a password"
            leftIcon={
              <Ionicons
                name="key-outline"
                size={24}
                color={colors.dark_border}
              />
            }
            isPassword={true}
            error={errors.password?.message?.toString()}
          />
        )}
      />
    </View>
  );
};

export default UserRegisterStep;
