import { useGlobalLoader } from "@/src/shared/hooks/UseGlobalLoader";
import React from "react";

const AwaitScreenStep = () => {
  const { showLoader } = useGlobalLoader();

  showLoader();
  return <></>;
};

export default AwaitScreenStep;
