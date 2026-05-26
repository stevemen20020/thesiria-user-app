import { useThemeStore } from "@/src/app-core/Store/themeStore";
import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";

interface Props {
  transparent?: boolean;
}

const HeaderBackground = ({ transparent = false }: Props) => {
  const colors = useThemeStore((state) => state.colors);

  if (transparent) {
    return <View style={StyleSheet.absoluteFill} pointerEvents="none" />;
  }

  return (
    <>
      <BlurView intensity={60} tint="light" style={StyleSheet.absoluteFill} />

      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: `${colors.background}CC`,
          },
        ]}
      />
    </>
  );
};

export default HeaderBackground;
