import ThemeInitializer from "@/src/app-core/Initializers/ThemeInitializer";
import BookLoaderOverlay from "@/src/app-core/Loader/BookLoader";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DropProvider } from "react-native-reanimated-dnd";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <DropProvider>
        <BookLoaderOverlay />
        <ThemeInitializer />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </DropProvider>
    </GestureHandlerRootView>
  );
}
