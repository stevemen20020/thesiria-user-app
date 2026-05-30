import React from "react";
import { View } from "react-native";
import { LeafletWebView } from "../LeafletView/LeafletView";
import useViewModel from "./ViewModel";

const MapView = () => {
  const { parsedTiles, tileWidth, tileHeight, isReady } = useViewModel();

  const COLUMNS = 5;
  const ROWS = 5;

  if (!isReady) {
    return <View style={{ flex: 1, backgroundColor: "red" }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <LeafletWebView
        tiles={parsedTiles}
        cols={COLUMNS}
        rows={ROWS}
        tileWidth={tileWidth}
        tileHeight={tileHeight}
      />
    </View>
  );
};

export default MapView;
