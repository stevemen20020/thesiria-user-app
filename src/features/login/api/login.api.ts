import { UsersWithTokenEntity } from "@/src/shared/entities/users/usersWithTokenEntity";
import { apiClient } from "@/src/shared/services/api/client";
import { ApiResponse } from "@/src/shared/types/Api.types";

export const loginUser = async (
  email: string,
  password: string,
): Promise<ApiResponse<UsersWithTokenEntity>> => {
  return apiClient.post<ApiResponse<UsersWithTokenEntity>>(
    "auth/login",
    { email, password },
    {
      skipAuth: true,
    },
  );
};
