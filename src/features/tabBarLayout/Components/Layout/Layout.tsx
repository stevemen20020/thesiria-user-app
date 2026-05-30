import MainFadedBackground from "@/src/shared/ui/Backgrounds/MainFadedBackground/MainFadedBackground";
import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import DiceButton from "../DiceButton/DiceButton";

type Props = React.PropsWithChildren;

const GameLayout = ({ children }: Props) => {
  return (
    <>
      <MainFadedBackground />

      <AppHeader />

      {children}

      <DiceButton />
    </>
  );
};

export default GameLayout;
