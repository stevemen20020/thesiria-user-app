import { AuthStore } from "../store/auth/Auth.store";

export const useAuthStore = () => {
  const user = AuthStore((s) => s.user);
  const accessToken = AuthStore((s) => s.accessToken);
  const refreshToken = AuthStore((s) => s.refreshToken);

  const setAuth = AuthStore((s) => s.setAuth);
  const clearAuth = AuthStore((s) => s.clearAuth);

  return {
    user,
    accessToken,
    refreshToken,
    setAuth,
    clearAuth,
  };
};
