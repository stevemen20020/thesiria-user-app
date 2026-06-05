import { io, Socket } from "socket.io-client";

class SocketClient {
  private socket: Socket | null = null;

  connect(token?: string) {
    if (this.socket?.connected) return this.socket;

    this.socket = io(process.env.EXPO_PUBLIC_API_URL, {
      transports: ["websocket"],
      auth: {
        token,
      },
      autoConnect: true,
    });

    return this.socket;
  }

  getSocket() {
    if (!this.socket) {
      throw new Error("Socket not initialized");
    }

    return this.socket;
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export const socketClient = new SocketClient();
