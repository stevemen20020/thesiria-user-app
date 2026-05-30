import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    overflow: "hidden",
  },

  mapContainer: {
    position: "relative",
  },

  tile: {
    position: "absolute",
  },

  marker: {
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: "red",
    position: "absolute",
    marginLeft: -12,
    marginTop: -12,
  },
});

export default styles;
