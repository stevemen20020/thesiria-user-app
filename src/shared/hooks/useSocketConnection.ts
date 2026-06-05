import { socketManager } from "@/src/app-core/Socket/socket.manager";
import { useEffect } from "react";
import { useAuthStore } from "./useAuthStore";

export const useSocketConnection = () => {
  const accessToken = useAuthStore().accessToken;

  useEffect(() => {
    if (!accessToken) return;

    socketManager.initialize(accessToken);

    return () => {
      socketManager.disconnect();
    };
  }, [accessToken]);
};
