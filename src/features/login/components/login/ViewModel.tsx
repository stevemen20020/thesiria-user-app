import { UsersEntity } from "@/src/shared/entities";
import { useGlobalLoader } from "@/src/shared/hooks/UseGlobalLoader";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useLogin } from "../../hooks/useLogin";

const ViewModel = () => {
  const [loginForm, setLoginForm] = useState<UsersEntity>({
    email: "",
    password: "",
  });

  const { isPending, handleUserLogin } = useLogin();
  const { showLoader, hideLoader } = useGlobalLoader();

  useEffect(() => {
    if (isPending) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [isPending]);

  const setFormValues = (value: string, key: string) => {
    setLoginForm((prev) => ({ ...prev, [key]: value }));
  };

  const goToRegister = () => {
    router.push("/register");
  };

  const handleLogin = async () => {
    try {
      await handleUserLogin({ user: loginForm });
      hideLoader();
      requestAnimationFrame(() => {
        router.replace("/welcome");
      });
    } catch (e: any) {
      if (e.data.message === "Bad form request") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Ingresa tu correo y contraseña mamabicho",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Usuario o contraseña incorrectos",
        });
      }
    }
  };

  return {
    loginForm,
    setFormValues,
    goToRegister,
    handleLogin,
  };
};

export default ViewModel;
