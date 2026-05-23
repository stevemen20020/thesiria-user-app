import React, { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";

interface GoBackButtonProps {
  title?: string;
  onPress: () => void;

  icon?: ReactNode;
}

const GoBackButton = ({ title, onPress, icon }: GoBackButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {icon && icon}
      {title && <Text>{title}</Text>}
    </TouchableOpacity>
  );
};

export default GoBackButton;
