import { queryClient } from "@/src/app-core/Initializers/QueryClient";
import ThemeInitializer from "@/src/app-core/Initializers/ThemeInitializer";
import BookLoaderOverlay from "@/src/app-core/Loader/BookLoader";
import { useSocketConnection } from "@/src/shared/hooks/useSocketConnection";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DropProvider } from "react-native-reanimated-dnd";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  useSocketConnection();

  return (
    <>
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <DropProvider>
            <BookLoaderOverlay />
            <ThemeInitializer />
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </DropProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
      <Toast />
    </>
  );
}
