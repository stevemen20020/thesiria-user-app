import React from "react";
import { View } from "react-native";
import { LeafletWebView } from "../LeafletView/LeafletView";
import useViewModel from "./ViewModel";

const MapView = () => {
  const { parsedTiles, tileWidth, tileHeight, isReady, parsedMapInfo } =
    useViewModel();

  if (!isReady) {
    return <View style={{ flex: 1, backgroundColor: "transparent" }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <LeafletWebView
        tiles={parsedTiles}
        cols={parsedMapInfo.width}
        rows={parsedMapInfo.height}
        tileWidth={tileWidth}
        tileHeight={tileHeight}
      />
    </View>
  );
};

export default MapView;
