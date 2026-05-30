import { TilesEntity } from "@/src/shared/entities";
import { apiClient } from "@/src/shared/services/api/client";
import { ApiResponse } from "@/src/shared/types/Api.types";

export const getMapTiles =
  async () //TODO: NEED TO REVISE HOW EACH EXACT MAP WILL BE FETCHED

  : Promise<ApiResponse<TilesEntity[]>> => {
    return apiClient.get<ApiResponse<TilesEntity[]>>("tiles?page=1&limit=25");
  };
