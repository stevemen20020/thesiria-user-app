import { useAuth } from "@/src/features/login/hooks/useAuth";
import { Redirect } from "expo-router";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return <Redirect href={isAuthenticated ? "/map" : "/register"} />;
}
