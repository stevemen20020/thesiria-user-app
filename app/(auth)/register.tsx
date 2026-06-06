import RegisterStepper from "@/src/features/register/components/RegisterStepper/RegisterStepper";
import { useRegisterStore } from "@/src/features/register/hooks/useRegisterStore";
import {
  RegisterFormType,
  registerSchema,
} from "@/src/features/register/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BackHandler } from "react-native";

const register = () => {
  const { character, user } = useRegisterStore();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );

  const methods = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),

    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUnregister: false,

    defaultValues: {
      ...user,
      ...character,
    },
  });

  return (
    <FormProvider {...methods}>
      <RegisterStepper />
    </FormProvider>
  );
};

export default register;
