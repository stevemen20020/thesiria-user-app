import { queryClient } from "@/src/app-core/Initializers/QueryClient";
import ThemeInitializer from "@/src/app-core/Initializers/ThemeInitializer";
import BookLoaderOverlay from "@/src/app-core/Loader/BookLoader";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DropProvider } from "react-native-reanimated-dnd";

export default function RootLayout() {
  return (
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
  );
}
