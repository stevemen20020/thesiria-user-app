import { useAuthStore } from "../store/login.store";

export function useAuth() {
  const token = useAuthStore((s) => s.token);
  const isLoading = useAuthStore((s) => s.isLoading);

  return {
    isAuthenticated: !!token,
    isLoading,
  };
}
