import { registerMapSocketEvents } from "@/src/features/map/sockets/map.socket";
import { socketClient } from "@/src/shared/services/api/socket.client";

class SocketManager {
  initialize(token?: string) {
    const socket = socketClient.connect(token);

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("SOCKET DISCONNECTED");
    });

    registerMapSocketEvents(socket);
  }

  disconnect() {
    socketClient.disconnect();
  }
}

export const socketManager = new SocketManager();
