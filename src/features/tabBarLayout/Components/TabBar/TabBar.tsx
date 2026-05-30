// TabBar.config.tsx

import { useThemeStore } from "@/src/app-core/Store/themeStore";
import {
  ICON_SIZE,
  RADIUS,
  SPACING,
  Z_INDEX,
} from "@/src/shared/constants/Tokens";

import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

export const useTabBarConfig = () => {
  const colors = useThemeStore((state) => state.colors);

  const screenOptions: BottomTabNavigationOptions = {
    tabBarShowLabel: true,
    headerShown: false,

    tabBarActiveTintColor: colors.primaryStrong,
    tabBarInactiveTintColor: colors.dark_border,

    tabBarStyle: {
      position: "absolute",
      bottom: SPACING.xxl,
      elevation: 0,
      height: 60,
      backgroundColor: "#fff",
      flexDirection: "row",
      borderRadius: RADIUS.l,
      paddingBottom: 0,
      marginHorizontal: 12,
      zIndex: Z_INDEX.overlay,
    },
  };

  return {
    screenOptions,

    screens: {
      map: {
        tabBarIcon: ({ color }: any) => (
          <Feather name="map" size={ICON_SIZE.m} color={color} />
        ),
        tabBarLabel: "Mapa",
      },

      character: {
        tabBarIcon: ({ color }: any) => (
          <Feather name="user" size={ICON_SIZE.m} color={color} />
        ),
        tabBarLabel: "Personaje",
      },

      dummy: {
        tabBarButton: () => <View style={{ width: 70 }} />,
      },

      journal: {
        tabBarIcon: ({ color }: any) => (
          <Feather name="book" size={ICON_SIZE.m} color={color} />
        ),
        tabBarLabel: "Diario",
      },

      attacks: {
        tabBarIcon: ({ color }: any) => (
          <MaterialCommunityIcons
            name="sword"
            size={ICON_SIZE.m}
            color={color}
          />
        ),
        tabBarLabel: "Ataques",
      },
    },
  };
};
