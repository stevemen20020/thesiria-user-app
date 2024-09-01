import { View, Dimensions } from "react-native";
import * as React from "react";
import { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import EnemyCard from "./EnemyCard";

import { BlurView } from "expo-blur";

const Enemy_Carousel = (props) => {
  const headerHeight = 200;
  const scale = 0.9;

  const RIGHT_OFFSET = Dimensions.get('window').width * (1 - scale);

  const ITEM_WIDTH = Dimensions.get('window').width * scale;
  const ITEM_HEIGHT = 120;

  const PAGE_HEIGHT = Dimensions.get('window').height - headerHeight;
  const PAGE_WIDTH = Dimensions.get('window').width;

  const animationStyle = React.useCallback(
    (value) => {
      "worklet";

      const translateY = interpolate(
        value,
        [-1, 0, 1],
        [-ITEM_HEIGHT, 0, ITEM_HEIGHT]
      );
      const right = interpolate(
        value,
        [-1, -0.2, 1],
        [RIGHT_OFFSET / 2, RIGHT_OFFSET, RIGHT_OFFSET / 3]
      );
      return {
        transform: [{ translateY }],
        right,
      };
    },
    [RIGHT_OFFSET]
  );

  return (
    <View style={{ flex: 1 }}>
      <BlurView
        intensity={0}
        style={{
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
          position: "absolute",
        }}
      />
      <Carousel
        loop
        vertical
        style={{
          justifyContent: "center",
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
        }}
        width={ITEM_WIDTH}
        pagingEnabled={false}
        height={ITEM_HEIGHT}
        data={props.enemyData}
        renderItem={( {item, index} ) => {
          return (
            <View key={index}>
              <EnemyCard enemy={item}/>
            </View>
          );
        }}
        customAnimation={animationStyle}
      />
    </View>
  );
};

export default Enemy_Carousel;
