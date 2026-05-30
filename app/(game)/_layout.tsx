import GameLayout from "@/src/features/tabBarLayout/Components/Layout/Layout";
import { useTabBarConfig } from "@/src/features/tabBarLayout/Components/TabBar/TabBar";
import { Tabs } from "expo-router";
export default function Layout() {
  const { screenOptions, screens } = useTabBarConfig();

  return (
    <GameLayout>
      <Tabs screenOptions={screenOptions}>
        <Tabs.Screen name="map" options={screens.map} />

        <Tabs.Screen name="character" options={screens.character} />

        <Tabs.Screen name="dummy" options={screens.dummy} />

        <Tabs.Screen name="journal" options={screens.journal} />

        <Tabs.Screen name="attacks" options={screens.attacks} />
      </Tabs>
    </GameLayout>
  );
}
