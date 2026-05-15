import { MainSelect } from "@/src/shared/ui/Selects/MainSelect/MainSelect";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import React from "react";
import { View } from "react-native";
import { useRegister } from "../../hooks/useRegister";
import styles from "./Styles";

const AffinityStep = () => {
  const { character, setCharacterData } = useRegister();

  return (
    <View style={styles.mainContainer}>
      <MainText variant="label">Seleccionemos una afinidad...</MainText>
      <MainSelect
        value={character.affinityId}
        onChange={(value: string | (string | number)[]) =>
          setCharacterData({ affinityId: String(value) })
        }
        placeholder="Pyromania"
        options={[{ value: 1, label: "Pyromania" }]}
      />
    </View>
  );
};

export default AffinityStep;
