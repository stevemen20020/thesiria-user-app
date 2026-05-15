import React from "react";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Draggable } from "react-native-reanimated-dnd";

import { useThemeStore } from "@/src/app-core/Store/themeStore";

import { FONT_SIZE, RADIUS, SPACING } from "@/src/shared/constants/Tokens";

import MainText from "@/src/shared/ui/Text/MainText/MainText";
import { RolledStat } from "../../types/register.types";

type Props = {
  value: RolledStat;
};

export const StatPill = ({ value }: Props) => {
  const colors = useThemeStore((state) => state.colors);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  return (
    <Draggable
      draggableId={`${value.id}`}
      data={{
        value: value.value,
      }}
      onDragStart={() => {
        scale.value = withSpring(1.12);
      }}
      onDragEnd={() => {
        scale.value = withSpring(1);
      }}
    >
      <Animated.View
        style={[
          {
            width: 64,

            height: SPACING.xxl,

            borderRadius: RADIUS.round,

            backgroundColor: colors.secondary,

            alignItems: "center",

            justifyContent: "center",
          },

          animatedStyle,
        ]}
      >
        <MainText
          style={{
            color: colors.dark_border,

            fontSize: FONT_SIZE.m,

            fontWeight: "800",
          }}
        >
          {value.value}
        </MainText>
      </Animated.View>
    </Draggable>
  );
};
