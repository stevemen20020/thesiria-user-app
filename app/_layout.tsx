import ThemeInitializer from "@/src/app-core/Initializers/ThemeInitializer";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <ThemeInitializer />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
