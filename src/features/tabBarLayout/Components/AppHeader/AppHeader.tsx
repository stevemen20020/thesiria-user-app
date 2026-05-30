import { useThemeStore } from "@/src/app-core/Store/themeStore";
import { usePlayableCharacterStore } from "@/src/shared/hooks/usePlayableCharacterStore";
import { usePathname } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBackground from "../HeaderBackground/HeaderBackground";
import styles from "./styles";

const HEADER_HEIGHT = 90;

const TITLES: Record<string, string> = {
  map: "Mapa",
  character: "Personaje",
  journal: "Diario",
  attacks: "Ataques",
};

const AppHeader = () => {
  const { character } = usePlayableCharacterStore();

  const pathname = usePathname();

  const colors = useThemeStore((state) => state.colors);

  const currentRoute = pathname.split("/").filter(Boolean).pop() || "map";

  const title = TITLES[currentRoute] || "Aventura";

  const transparent = currentRoute === "map";

  const hasPicture = () => {
    if (character.imageReference) {
      return { uri: character.imageReference };
    } else {
      return { uri: "https://i.pravatar.cc/300" };
    }
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={[
        styles.container,
        {
          height: HEADER_HEIGHT,
        },
      ]}
    >
      <HeaderBackground transparent={false} />

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: colors.textPrimary,
            },
          ]}
        >
          {title}
        </Text>

        <Pressable
          onPress={() => console.log("YENDO A PROFILE")}
          style={({ pressed }) => [
            styles.avatarButton,
            {
              backgroundColor: colors.surface,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Image source={hasPicture()} style={styles.avatar} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;
