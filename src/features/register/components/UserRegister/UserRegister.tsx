import { useThemeStore } from "@/src/app-core/Store/themeStore";
import MainInput from "@/src/shared/ui/Inputs/MainInput/MainInput";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { View } from "react-native";
import { useRegister } from "../../hooks/useRegister";
import styles from "./Styles";

const UserRegisterStep = () => {
  const { user, setUserData } = useRegister();

  const colors = useThemeStore((state) => state.colors);

  return (
    <View style={styles.mainContainer}>
      <MainText variant="label">
        Finalmente, hay que crear una cuenta...
      </MainText>
      <MainInput
        value={user.email}
        onChange={(text: string) => setUserData({ email: text })}
        variant="clear"
        placeholder="example@user.com"
        leftIcon={<Feather name="user" size={24} color={colors.dark_border} />}
      />
      <MainInput
        value={user.password}
        onChange={(text: string) => setUserData({ password: text })}
        variant="clear"
        placeholder="Woowiiiwooooo i am a password"
        leftIcon={
          <Ionicons name="key-outline" size={24} color={colors.dark_border} />
        }
        isPassword={true}
      />
    </View>
  );
};

export default UserRegisterStep;
