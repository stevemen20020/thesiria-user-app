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
import { Tabs } from "expo-router";
import { View } from "react-native";

const TabBar = () => {
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

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ color }) => {
            return <Feather name="map" size={ICON_SIZE.m} color={color} />;
          },
          tabBarLabel: "Mapa",
        }}
      />

      <Tabs.Screen
        name="character"
        options={{
          tabBarIcon: ({ color }) => {
            return <Feather name="user" size={ICON_SIZE.m} color={color} />;
          },
          tabBarLabel: "Personaje",
        }}
      />

      <Tabs.Screen
        name="dummy"
        options={{
          tabBarButton: () => <View style={{ width: 70 }} />,
        }}
      />

      <Tabs.Screen
        name="journal"
        options={{
          tabBarIcon: ({ color }) => {
            return <Feather name="book" size={ICON_SIZE.m} color={color} />;
          },
          tabBarLabel: "Diario",
        }}
      />

      <Tabs.Screen
        name="attacks"
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons
                name="sword"
                size={ICON_SIZE.m}
                color={color}
              />
            );
          },
          tabBarLabel: "Ataques",
        }}
      />
    </Tabs>
  );
};

export default TabBar;
