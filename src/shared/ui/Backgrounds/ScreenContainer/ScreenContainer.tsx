import { useThemeStore } from "@/src/app-core/Store/themeStore";
import React from "react";
import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View
} from "react-native";

interface Props extends ScrollViewProps {
  children: React.ReactNode;

  scrollable?: boolean;

  noPaddingTop?: boolean;
}

const HEADER_HEIGHT = 90;

const ScreenContainer = ({
  children,
  scrollable = true,
  noPaddingTop = false,
  contentContainerStyle,
  style,
  ...props
}: Props) => {
  const colors = useThemeStore((state) => state.colors);

  const paddingTop = noPaddingTop ? 0 : HEADER_HEIGHT;

  if (scrollable) {
    return (
      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
          style,
        ]}
        contentContainerStyle={[
          {
            paddingTop,
            paddingBottom: 140,
          },
          contentContainerStyle,
        ]}
        showsVerticalScrollIndicator={false}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
