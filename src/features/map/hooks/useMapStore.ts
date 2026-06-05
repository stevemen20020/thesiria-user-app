import { MapStore } from "../store/map.store";

export function useMapStore() {
  const mapId = MapStore((s) => s.mapId);
  const setMapId = MapStore((s) => s.setMapId);

  return {
    mapId,
    setMapId,
  };
}
