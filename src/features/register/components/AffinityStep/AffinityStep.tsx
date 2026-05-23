import { MainSelect } from "@/src/shared/ui/Selects/MainSelect/MainSelect";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import React from "react";
import { View } from "react-native";
import { useRegisterStore } from "../../hooks/useRegisterStore";
import styles from "./Styles";
import useViewModel from "./ViewModel";

const AffinityStep = () => {
  const { character, setCharacterData } = useRegisterStore();
  const { parsedAffinities } = useViewModel();

  return (
    <View style={styles.mainContainer}>
      <MainText variant="label">Seleccionemos una afinidad...</MainText>
      <MainSelect
        value={character.affinityId}
        onChange={(value: string | (string | number)[]) =>
          setCharacterData({ affinityId: String(value) })
        }
        placeholder="Pyromania"
        options={parsedAffinities}
      />
    </View>
  );
};

export default AffinityStep;
