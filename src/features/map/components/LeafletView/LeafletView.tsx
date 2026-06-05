import React, { useMemo } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

interface LeafletWebViewProps {
  tiles: string[];
  cols: number;
  rows: number;
  tileWidth: number;
  tileHeight: number;
  onMarkerClick?: (id: number) => void;
}

export const LeafletWebView: React.FC<LeafletWebViewProps> = ({
  tiles,
  cols,
  rows,
  tileWidth,
  tileHeight,
  onMarkerClick,
}) => {
  const leafletHTML = useMemo(() => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
          html, body, #map { margin: 0; padding: 0; width: 100%; height: 100%; background: transparent; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
          document.addEventListener("DOMContentLoaded", () => {
            const TILE_WIDTH = ${tileWidth};
            const TILE_HEIGHT = ${tileHeight};
            const COLS = ${cols};
            const ROWS = ${rows};
            
            const MAP_WIDTH = COLS * TILE_WIDTH;
            const MAP_HEIGHT = ROWS * TILE_HEIGHT;
            const tiles = ${JSON.stringify(tiles)};

            const map = L.map("map", {
              crs: L.CRS.Simple,
              maxZoom: 2,
              zoomSnap: 0.1, // Zoom Snap para una experiencia más suave
              attributionControl: false,
              zoomControl: false // Sin botones de + y -
            });

            const bounds = [[0, 0], [MAP_HEIGHT, MAP_WIDTH]];

            tiles.forEach((url, index) => {
              const col = index % COLS;
              const row = Math.floor(index / COLS);
              
              const x = col * TILE_WIDTH;
              
              // Cálculo del Eje Y para renderizar de arriba hacia abajo
              const yBottom = MAP_HEIGHT - ((row + 1) * TILE_HEIGHT);
              const yTop = MAP_HEIGHT - (row * TILE_HEIGHT);

              const imageBounds = [
                [yBottom, x], 
                [yTop, x + TILE_WIDTH] // -> AJUSTE 1
              ];

              L.imageOverlay(url, imageBounds).addTo(map);
            });

            map.setMaxBounds(bounds);

            function calculateMinZoom() {
              const c_width = map.getContainer().clientWidth;
              const c_height = map.getContainer().clientHeight;

              if (c_width === 0 || c_height === 0) return;

              const scaleW = c_width / MAP_WIDTH;
              const scaleH = c_height / MAP_HEIGHT;
              
              const requiredScale = Math.max(scaleW, scaleH);
              
              const minZoom = Math.log(requiredScale) / Math.LN2;
              
              map.setMinZoom(minZoom);
              map.setZoom(Math.max(map.getZoom(), minZoom)); 
            }

            setTimeout(() => {
              calculateMinZoom();
              map.fitBounds(bounds);
            }, 100);

            window.addEventListener('resize', calculateMinZoom);
            map.fitBounds(bounds);
          });
        </script>
      </body>
    </html>
    `;
  }, [tiles, cols, rows, tileWidth, tileHeight]);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: leafletHTML, baseUrl: "https://unpkg.com" }}
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
        overScrollMode="never"
        style={{ flex: 1, backgroundColor: "black" }}
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data);
        }}
      />
    </View>
  );
};
