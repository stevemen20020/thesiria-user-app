import { TilesEntity } from "@/src/shared/entities";
import { useGlobalLoader } from "@/src/shared/hooks/UseGlobalLoader";
import { ApiResponse } from "@/src/shared/types/Api.types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Image } from "react-native";
import { getMapTiles } from "../../api/ map.api";
import { useMapStore } from "../../hooks/useMapStore";

const ViewModel = () => {
  const { showLoader, hideLoader } = useGlobalLoader();
  const [tileDimensions, setTileDimensions] = useState({ width: 0, height: 0 });
  const { mapId } = useMapStore();

  const { data: mapTiles, isPending: mapTilesLoading } = useQuery<
    ApiResponse<TilesEntity[]>
  >({
    queryKey: ["map-tiles", mapId],
    queryFn: () => getMapTiles(mapId),
    enabled: !!mapId,
  });

  const parsedTiles = useMemo(() => {
    return mapTiles
      ? mapTiles.result.map((element: TilesEntity) => element.image)
      : [];
  }, [mapTiles]);

  useEffect(() => {
    if (parsedTiles.length > 0 && tileDimensions.width === 0) {
      const firstTileUrl = parsedTiles[0];

      Image.getSize(
        firstTileUrl,
        (width, height) => {
          setTileDimensions({ width, height });
        },
        (error) => {
          console.error("Error obteniendo dimensiones de la imagen:", error);
          setTileDimensions({ width: 256, height: 256 });
        },
      );
    }
  }, [parsedTiles, tileDimensions.width]);

  useEffect(() => {
    const isCalculatingDimensions =
      parsedTiles.length > 0 && tileDimensions.width === 0;

    if (mapTilesLoading || isCalculatingDimensions) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [
    mapTilesLoading,
    parsedTiles.length,
    tileDimensions.width,
    showLoader,
    hideLoader,
  ]);

  return {
    parsedTiles,
    tileWidth: tileDimensions.width,
    tileHeight: tileDimensions.height,
    isReady: !mapTilesLoading && tileDimensions.width > 0,
  };
};

export default ViewModel;
