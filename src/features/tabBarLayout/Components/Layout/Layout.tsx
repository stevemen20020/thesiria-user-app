import MainFadedBackground from "@/src/shared/ui/Backgrounds/MainFadedBackground/MainFadedBackground";
import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import DiceButton from "../DiceButton/DiceButton";
import TabBar from "../TabBar/TabBar";

const Layout = () => {
  return (
    <>
      <AppHeader />
      <TabBar />
      <DiceButton />
      <MainFadedBackground />
    </>
  );
};

export default Layout;
