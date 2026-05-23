import { MainSelect } from "@/src/shared/ui/Selects/MainSelect/MainSelect";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import React from "react";
import { View } from "react-native";
import { useRegisterStore } from "../../hooks/useRegisterStore";
import styles from "./Styles";
import useViewModel from "./ViewModel";

const RaceStep = () => {
  const { character, setCharacterData } = useRegisterStore();
  const { parsedRaces } = useViewModel();

  return (
    <View style={styles.mainContainer}>
      <MainText variant="label">Seleccionemos una raza...</MainText>
      <MainSelect
        value={character.idRace}
        onChange={(value: string | (string | number)[]) =>
          setCharacterData({ idRace: String(value) })
        }
        placeholder="Humano"
        options={parsedRaces}
      />
    </View>
  );
};

export default RaceStep;
