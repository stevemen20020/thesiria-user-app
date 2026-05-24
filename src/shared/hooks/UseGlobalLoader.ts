import { Loader } from "@/src/app-core/Store/loaderStore";

export const useGlobalLoader = () => {
  const showLoader = (message?: string) => {
    Loader.show(message);
  };

  const hideLoader = () => {
    Loader.hide();
  };

  return {
    showLoader,
    hideLoader,
  };
};
