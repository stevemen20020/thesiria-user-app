import { SOCKET_EVENTS } from "@/src/app-core/Socket/socket.events";
import { Socket } from "socket.io-client";
import { MapStore } from "../store/map.store";

export const registerMapSocketEvents = (socket: Socket) => {
  socket.on(SOCKET_EVENTS.MAP_CHANGED, (map) => {
    MapStore.getState().setMapId(map.mapId);
  });
};
