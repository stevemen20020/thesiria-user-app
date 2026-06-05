import { create } from "zustand";

type MapState = {
  mapId: string;

  setMapId: (id: string) => void;
};

export const MapStore = create<MapState>((set) => ({
  mapId: "",

  setMapId: (id) =>
    set(() => ({
      mapId: id,
    })),
}));
