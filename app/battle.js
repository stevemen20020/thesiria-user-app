import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const PAGE_WIDTH = Dimensions.get('window').width / 2; // Correctly getting the screen width

const Battle = () => {
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: 400,
  };

  return (
    <View style={styles.container}>
      <Carousel
        {...baseOptions}
        loop
        style={{
          height:400,
          width: Dimensions.get('window').width,
          justifyContent: "center",
          alignItems: "center",
        }}
        autoPlay={false}
        autoPlayInterval={150}
        scrollAnimationDuration={600}
        data={[...new Array(9).keys()]}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems:'center',
              display:"flex",
              flexDirection:'column'
            }}
          >
            <Image style={{width: 300, height: 300}} source={{uri:'https://thesiria.com/character-image/kamisato_ayaka_pj_rez.png'}}/>
            <View style={{width:'100%', height:40, marginTop:30, backgroundColor:'red', borderRadius:25}}>

            </View>
          </View>
        )}

        customAnimation={(value) => {
          "worklet";
          const size = PAGE_WIDTH;

          // Validate that value is a number before proceeding
          if (typeof value !== 'number') {
            console.warn('Invalid value received:', value);
            return { transform: [] };
          }

          const scale = interpolate(
            value,
            [-2, -1, 0, 1, 2],
            [1.7, 1.2, 1, 1.2, 1.7],
            Extrapolate.CLAMP,
          );

          const translate = interpolate(
            value,
            [-2, -1, 0, 1, 2],
            [-size * 1.45, -size * 0.9, 0, size * 0.9, size * 1.45],
          );

          const transform = {
            transform: [
              { scale },
              {
                translateX: translate,
              },
              { perspective: 150 },
              {
                rotateY: `${interpolate(
                  value,
                  [-1, 0, 1],
                  [30, 0, -30],
                  Extrapolate.CLAMP,
                )}deg`,
              },
            ],
          };

          return {
            ...withAnchorPoint(
              transform,
              { x: 0.5, y: 0.5 },
              {
                width: baseOptions.width,
                height: baseOptions.height,
              },
            ),
          };
        }}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
      />
    </View>
  );
};

export default Battle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const isValidSize = (size) => {
  "worklet";
  return size && size.width > 0 && size.height > 0;
};

const defaultAnchorPoint = { x: 0.5, y: 0.5 };

export const withAnchorPoint = (
  transform,
  anchorPoint,
  size,
) => {
  "worklet";

  if (!isValidSize(size)) return transform;

  let injectedTransform = transform.transform;
  if (!injectedTransform) return transform;

  if (anchorPoint.x !== defaultAnchorPoint.x && size.width) {
    const shiftTranslateX = [];

    shiftTranslateX.push({
      translateX: size.width * (anchorPoint.x - defaultAnchorPoint.x),
    });
    injectedTransform = [...shiftTranslateX, ...injectedTransform];
    injectedTransform.push({
      translateX: size.width * (defaultAnchorPoint.x - anchorPoint.x),
    });
  }

  if (!Array.isArray(injectedTransform)) return { transform: injectedTransform };

  if (anchorPoint.y !== defaultAnchorPoint.y && size.height) {
    const shiftTranslateY = [];
    shiftTranslateY.push({
      translateY: size.height * (anchorPoint.y - defaultAnchorPoint.y),
    });
    injectedTransform = [...shiftTranslateY, ...injectedTransform];
    injectedTransform.push({
      translateY: size.height * (defaultAnchorPoint.y - anchorPoint.y),
    });
  }

  return { transform: injectedTransform };
};
