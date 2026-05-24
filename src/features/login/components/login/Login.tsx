import { useThemeStore } from "@/src/app-core/Store/themeStore";
import { RADIUS } from "@/src/shared/constants/Tokens";
import MainFadedBackground from "@/src/shared/ui/Backgrounds/MainFadedBackground/MainFadedBackground";
import IconButton from "@/src/shared/ui/Buttons/IconButton/IconButton";
import BasicCard from "@/src/shared/ui/Cards/BasicCard/BasicCard";
import MainInput from "@/src/shared/ui/Inputs/MainInput/MainInput";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import React from "react";
import { Image, KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import useViewModel from "./ViewModel";

const Login = () => {
  const colors = useThemeStore((state) => state.colors);
  const { loginForm, setFormValues, goToRegister, handleLogin } =
    useViewModel();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainFadedBackground />

      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <BasicCard
          variant="outline"
          size="l"
          style={{ borderRadius: RADIUS.xxl }}
        >
          <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../../../../assets/images/placeholder-logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View>
              <MainText variant="eyebrow">EMAIL</MainText>
              <MainInput
                value={loginForm.email}
                onChange={(value) => setFormValues(value, "email")}
                placeholder="jorge@nitales.com"
              />
            </View>
            <View>
              <MainText variant="eyebrow">PASSWORD</MainText>
              <MainInput
                value={loginForm.password}
                onChange={(value) => setFormValues(value, "password")}
                isPassword={true}
                placeholder="Vegetta777"
              />
            </View>
          </View>
        </BasicCard>

        <View style={styles.cardContainer}>
          <IconButton text="LOG IN" onPress={handleLogin} />
        </View>

        <IconButton variant="ghost" size="s" onPress={goToRegister}>
          <MainText
            variant="eyebrow"
            style={{ textDecorationLine: "underline" }}
            color={colors.accent}
          >
            ¿No has creado a tu personaje? ¡Regístrate!
          </MainText>
        </IconButton>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
