import { router } from "expo-router";
import { AuthStore } from "../store/auth/Auth.store";
import { PlayableCharacterStore } from "../store/playableChracter/PlayableCharacter.store";

export const useAuthStore = () => {
  const user = AuthStore((s) => s.user);
  const accessToken = AuthStore((s) => s.accessToken);
  const refreshToken = AuthStore((s) => s.refreshToken);

  const setAuth = AuthStore((s) => s.setAuth);
  const clearAuth = AuthStore((s) => s.clearAuth);

  const logOut = () => {
    AuthStore.getState().clearAuth();
    PlayableCharacterStore.getState().clearCharacterData();

    router.replace("/login");
  };

  return {
    user,
    accessToken,
    refreshToken,
    setAuth,
    clearAuth,
    logOut,
  };
};
