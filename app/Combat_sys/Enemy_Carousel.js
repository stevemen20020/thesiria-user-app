import { Text, View, Image, Dimensions } from "react-native";
import * as React from "react";
import { interpolate } from "react-native-reanimated";
import Carousel, { TAnimationStyle } from "react-native-reanimated-carousel";

import { faker } from "@faker-js/faker";
import { BlurView } from "expo-blur";

const Enemy_Carousel = (props) => {
  const headerHeight = 100;
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
        //tint="light"
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
            <View key={index} style={{ flex: 1, padding: 10 }}>
              <View
                style={{
                  alignItems: "flex-start",
                  flex: 1,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  borderRadius: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      marginRight: 5,
                    }}
                    source={{
                      uri: `${item.weapon !== null ? item.weapon.image : null}`,
                    }}
                  />
                  <Text
                    //numberOfLines={1}
                    style={{
                      width: 100,
                      color: "black",
                    }}
                  >
                    {item.name} {item.weapon !== null ? ' - ' + item.weapon.name : ''}
                  </Text>
                </View>
                <View
                  style={{
                    width: ITEM_WIDTH * 0.6,
                    height: ITEM_HEIGHT - 20,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    style={{
                      width: ITEM_WIDTH * 0.6,
                      height: ITEM_HEIGHT - 20,
                      borderRadius: 10,
                      marginRight: 5,
                      resizeMode:'contain'
                    }}
                    source={{
                      uri: `${item.image_reference}`,
                    }}
                  />
                </View>
              </View>
            </View>
          );
        }}
        customAnimation={animationStyle}
      />
    </View>
  );
};

export default Enemy_Carousel;
