import React from "react";
import { View } from "react-native";
// IMPORTANTE: Importamos ScrollView de gesture-handler, NO de react-native
import { ScrollView } from "react-native-gesture-handler";

import { DropProvider } from "react-native-reanimated-dnd";

import { useRegisterStore } from "../../hooks/useRegisterStore";

import { StatCard } from "../StatCard/StatCard";
import { StatPill } from "../StatPill/StatPill";

import { STATS } from "../../types/register.types";

import { SPACING } from "@/src/shared/constants/Tokens";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import styles from "./Styles";

const AssignSkillStep = () => {
  const { statsArray, usedRolls } = useRegisterStore();

  const usedRollIds = Object.values(usedRolls);

  const availableStats = statsArray.filter(
    (roll) => !usedRollIds.includes(roll.id),
  );

  return (
    <DropProvider>
      <View style={[styles.container, { flex: 1 }]}>
        {/* Contenedor horizontal de las píldoras */}
        <View style={{ paddingVertical: 12 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
          >
            {availableStats.map((roll) => (
              <StatPill key={roll.id} value={roll} />
            ))}
          </ScrollView>
        </View>

        {/* Contenedor vertical de las tarjetas de estadísticas */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }} // Espacio extra al final para poder hacer scroll cómodo
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              rowGap: SPACING.m,
            }}
          >
            {STATS.map((stat) => (
              <StatCard statKey={stat.key} label={stat.label} key={stat.key} />
            ))}
          </View>
        </ScrollView>
        <MainText variant="label">Asigna tus stats!</MainText>
        <MainText variant="label">
          Cuidado! una vez asignada una stat, no se puede cambiar
        </MainText>
      </View>
    </DropProvider>
  );
};

export default AssignSkillStep;
