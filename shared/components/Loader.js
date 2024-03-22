import { View, StyleSheet, Image } from 'react-native'
import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Loader = ({ source, size }) => {
  const rotateValue = useSharedValue(0);

  // Define el estilo de la imagen animada
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotateValue.value}deg` }],
    };
  });

  useEffect(() => {
    rotateValue.value = withTiming(360, { duration: 3000, easing: Easing.linear });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View style={[{ width: size, height: size }, animatedStyle]}>
        <Image source={source} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#f0f0f0', // Change as per your preference
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    paddingVertical: 24,
  },
});

export default Loader