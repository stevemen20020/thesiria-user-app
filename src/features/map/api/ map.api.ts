import { TilesEntity } from "@/src/shared/entities";
import { apiClient } from "@/src/shared/services/api/client";
import { ApiResponse } from "@/src/shared/types/Api.types";

export const getMapTiles = async (
  mapId: string, //TODO: NEED TO REVISE HOW EACH EXACT MAP WILL BE FETCHED
): Promise<ApiResponse<TilesEntity[]>> => {
  const params = new URLSearchParams({
    limit: "9999",
    page: "1",
    structureId: mapId,
  });

  return apiClient.get<ApiResponse<TilesEntity[]>>(
    `tiles?${params.toString()}`,
  );
};
