import React from "react";

import { View } from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Droppable } from "react-native-reanimated-dnd";

import { useThemeStore } from "@/src/app-core/Store/themeStore";

import MainText from "@/src/shared/ui/Text/MainText/MainText";

import { useRegister } from "../../hooks/useRegister";
import { StatKey } from "../../types/register.types";

type Props = {
  statKey: StatKey;
  label: string;
};

type DragData = {
  value: number;
};

export const StatCard = ({ statKey, label }: Props) => {
  const colors = useThemeStore((state) => state.colors);

  const { character, setCharacterData } = useRegister();

  const scale = useSharedValue(1);

  const value = character?.[statKey];

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  const handleDrop = (data: DragData) => {
    const incomingValue = data.value;

    const currentValue = Number(character?.[statKey]);

    const updatedCharacter = {
      ...character,

      [statKey]: incomingValue.toString(),
    };

    // swap automático
    if (!isNaN(currentValue)) {
      const previousStat = Object.entries(character).find(
        ([_, val]) => Number(val) === incomingValue,
      )?.[0] as StatKey | undefined;

      if (previousStat) {
        updatedCharacter[previousStat] = currentValue.toString();
      }
    }

    setCharacterData(updatedCharacter);
  };

  return (
    <Droppable<DragData>
      droppableId={statKey}
      onDrop={handleDrop}
      onActiveChange={(active) => {
        scale.value = withSpring(active ? 1.05 : 1);
      }}
      activeStyle={{
        borderColor: colors.accent,

        transform: [
          {
            scale: 1.03,
          },
        ],
      }}
      style={{ width: "48%" }}
    >
      <Animated.View
        style={[
          {
            aspectRatio: 1,

            borderRadius: 28,

            padding: 16,

            borderWidth: 2,

            justifyContent: "space-between",

            backgroundColor: colors.background,

            borderColor: "transparent",
          },

          animatedStyle,
        ]}
      >
        <MainText
          style={{
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          {label}
        </MainText>

        <View
          style={{
            height: 70,

            borderRadius: 18,

            borderWidth: 2,

            borderStyle: "dashed",

            borderColor: colors.disabled,

            alignItems: "center",

            justifyContent: "center",
          }}
        >
          <MainText>{value ?? "?"}</MainText>
        </View>
      </Animated.View>
    </Droppable>
  );
};
