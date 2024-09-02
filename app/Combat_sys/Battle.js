import { View, StyleSheet, StatusBar } from 'react-native'
import { useEffect } from 'react'
import Enemy_Carousel from './Enemy_Carousel'
import BattleViewModel from './ViewModel'
import Button_Panel from './Button_Panel'
import Animated, { useDerivedValue, useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated'

const Battle = () => {

  const { enemies, character } = BattleViewModel()

  const animation = useSharedValue(0)
  const rotation = useDerivedValue(() => {
    return animation.value; // Simplemente tomar el valor directamente
  });
  
  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` } // Usar el valor directamente
      ]
    };
  });

  useEffect(() => {
    startAnimation()
  },[])

  const startAnimation = () => {
    animation.value = withRepeat(
      withTiming(-1000, { duration: 80000 }),
      -1, // -1 indica repetir indefinidamente
      false // false indica que no debe hacer el bucle inverso
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.Image
        style={[styles.dice, animationStyle]}
        source={require('../../shared/images/ouroboros.png')}
      />
      <Enemy_Carousel enemyData={enemies}/>
      <Button_Panel character ={character}/>
    </View>
  )
}

export default Battle

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#2b2b2b'
    },
    dice:{
      position:'absolute',
      zIndex:0,
      top:150,
      right:-310,
      height:680,
      width:680,
      opacity:0.20,
    },
});
