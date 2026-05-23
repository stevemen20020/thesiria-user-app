import {
  AffinityEntity,
  PlayableCharacterEntity,
  RacesEntity,
  UsersEntity,
} from "@/src/shared/entities";
import { UsersWithTokenEntity } from "@/src/shared/entities/users/usersWithTokenEntity";
import { apiClient } from "@/src/shared/services/api/client";
import { ApiResponse } from "@/src/shared/types/Api.types";

export const registerUser = async (
  user: UsersEntity,
  playableCharacter: PlayableCharacterEntity,
): Promise<ApiResponse<UsersWithTokenEntity>> => {
  return apiClient.post<ApiResponse<UsersWithTokenEntity>>(
    "auth",
    {
      user,
      playableCharacter,
    },
    {
      skipAuth: true,
    },
  );
};

export const getRaces = async (): Promise<ApiResponse<RacesEntity[]>> => {
  return apiClient.get<ApiResponse<RacesEntity[]>>("races?page=1&limit=10000", {
    skipAuth: true,
  });
};

export const getAffinities = async (): Promise<
  ApiResponse<AffinityEntity[]>
> => {
  return apiClient.get<ApiResponse<AffinityEntity[]>>(
    "affinity?page=1&limit=10000",
    {
      skipAuth: true,
    },
  );
};
