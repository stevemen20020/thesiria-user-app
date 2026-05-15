import { MainSelect } from "@/src/shared/ui/Selects/MainSelect/MainSelect";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import React from "react";
import { View } from "react-native";
import { useRegister } from "../../hooks/useRegister";
import styles from "./Styles";

const RaceStep = () => {
  const { character, setCharacterData } = useRegister();

  return (
    <View style={styles.mainContainer}>
      <MainText variant="label">Seleccionemos una raza...</MainText>
      <MainSelect
        value={character.idRace}
        onChange={(value: string | (string | number)[]) =>
          setCharacterData({ idRace: String(value) })
        }
        placeholder="Humano"
        options={[{ value: 1, label: "Humano" }]}
      />
    </View>
  );
};

export default RaceStep;
