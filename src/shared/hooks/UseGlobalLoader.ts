import { useEffect } from "react";

import { Loader } from "@/src/app-core/Store/loaderStore";

export const useGlobalLoader = (message?: string) => {
  useEffect(() => {
    Loader.show(message);

    return () => {
      Loader.hide();
    };
  }, [message]);
};
