import { useAuthStore } from "@/src/shared/hooks/useAuthStore";
import { Redirect } from "expo-router";

export default function Index() {
  const { accessToken } = useAuthStore();

  return <Redirect href={accessToken ? "/map" : "/login"} />;
}
