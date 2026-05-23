import { useThemeStore } from "@/src/app-core/Store/themeStore";
import IconButton from "@/src/shared/ui/Buttons/IconButton/IconButton";
import BasicCard from "@/src/shared/ui/Cards/BasicCard/BasicCard";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { View } from "react-native";
import { RolledStat } from "../../types/register.types";
import styles from "./Styles";
import useViewModel from "./ViewModel";

const SkillsStep = () => {
  const { statsArray, generateRandomNumber, setSkillIndex, pressNumber } =
    useViewModel();

  const colors = useThemeStore((state) => state.colors);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.cardsContainer}>
        {statsArray.map((element: RolledStat) => (
          <BasicCard
            variant="outline"
            style={{ width: 82 }}
            size="m"
            key={element.id}
            contentStyle={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MainText textAlign="center" size="xl">
              {element.value}
            </MainText>
          </BasicCard>
        ))}
      </View>
      <MainText variant="label">
        Manten presionado para tirar un dado...
      </MainText>
      <IconButton
        icon={
          <FontAwesome5
            name="dice-d20"
            size={24}
            color={statsArray.length < 11 ? "white" : colors.disabled}
          />
        }
        onHold={() => generateRandomNumber()}
        onPress={pressNumber}
        disabled={statsArray.length >= 11}
      />
    </View>
  );
};

export default SkillsStep;
