import { create } from "zustand";

interface LoaderStore {
  visible: boolean;
  message?: string;

  showLoader: (message?: string) => void;
  hideLoader: () => void;
}

export const useLoaderStore = create<LoaderStore>((set) => ({
  visible: false,
  message: undefined,

  showLoader: (message) =>
    set((state) => {
      if (state.visible && state.message === message) {
        return state;
      }

      return {
        visible: true,
        message,
      };
    }),

  hideLoader: () =>
    set({
      visible: false,
      message: undefined,
    }),
}));

// Helpers para poder llamarlo desde cualquier parte
export const Loader = {
  show: (message?: string) => useLoaderStore.getState().showLoader(message),

  hide: () => useLoaderStore.getState().hideLoader(),
};
