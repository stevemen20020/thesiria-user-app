import { MainSelect } from "@/src/shared/ui/Selects/MainSelect/MainSelect";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import styles from "./Styles";
import useViewModel from "./ViewModel";

const RaceStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { parsedRaces } = useViewModel();

  return (
    <View style={styles.mainContainer}>
      <MainText variant="label">Seleccionemos una raza...</MainText>
      <Controller
        control={control}
        name="idRace"
        render={({ field: { onChange, value } }) => (
          <MainSelect
            value={value}
            onChange={onChange}
            placeholder="Humano"
            options={parsedRaces}
            errors={errors.idRace?.message?.toString()}
          />
        )}
      />
    </View>
  );
};

export default RaceStep;
