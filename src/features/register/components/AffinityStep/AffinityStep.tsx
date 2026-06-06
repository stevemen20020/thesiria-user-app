import { MainSelect } from "@/src/shared/ui/Selects/MainSelect/MainSelect";
import MainText from "@/src/shared/ui/Text/MainText/MainText";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import styles from "./Styles";
import useViewModel from "./ViewModel";

const AffinityStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { parsedAffinities } = useViewModel();

  return (
    <View style={styles.mainContainer}>
      <MainText variant="label">Seleccionemos una afinidad...</MainText>
      <Controller
        control={control}
        name="affinityId"
        render={({ field: { onChange, value } }) => (
          <MainSelect
            value={value}
            onChange={onChange}
            placeholder="Pyromania"
            options={parsedAffinities}
            errors={errors.affinityId?.message?.toString()}
          />
        )}
      />
    </View>
  );
};

export default AffinityStep;
