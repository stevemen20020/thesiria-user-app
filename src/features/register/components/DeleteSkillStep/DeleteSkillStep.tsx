import { useThemeStore } from "@/src/app-core/Store/themeStore";
import BasicCard from "@/src/shared/ui/Cards/BasicCard/BasicCard";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import React from "react";
import { View } from "react-native";
import { useRegisterStore } from "../../hooks/useRegisterStore";
import { RolledStat } from "../../types/register.types";
import styles from "./Styles";

const DeleteSkillStep = () => {
  const { statsArray, deleteSkill } = useRegisterStore();
  const colors = useThemeStore((state) => state.colors);

  const defineLowestNumber = (index: number) => {
    if (statsArray.length > 10) {
      const values = statsArray.map((element: RolledStat) => element.value);
      if (values[index] === Math.min(...values)) return colors.secondary;
    }
    return colors.background;
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.cardsContainer}>
        {statsArray.map((element: RolledStat, index: number) => (
          <BasicCard
            variant="outline"
            style={{ width: 82, backgroundColor: defineLowestNumber(index) }}
            size="m"
            key={element.id}
            contentStyle={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={
              statsArray.length > 10 ? () => deleteSkill(index) : undefined
            }
          >
            <MainText textAlign="center" size="xl">
              {element.value}
            </MainText>
          </BasicCard>
        ))}
      </View>
      <MainText variant="label">Selecciona un número para eliminarlo</MainText>
    </View>
  );
};

export default DeleteSkillStep;
