import { View, Text, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated'

const Combat_Header = (props) => {
  const [timer, setTimer] = useState(0)
  const [round, setRound] = useState(-1)
  const [maxTimer, setMaxTimer] = useState(props.timer);
  
  useEffect(() => {
    if(props.round != round)  {
      setRound(props.round),
      setTimer(props.timer)
    }
  }, [props])

  useEffect(() => {
    let interval = null
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1)
      }, 1000)
    } else if(timer === 0 && interval) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [timer])

  const animatedStyle = useAnimatedStyle(() => {
    const widthPercentage = (timer / maxTimer) * 100; // Calcula el ancho de la barra
    return {
      width: withTiming(`${widthPercentage}%`, { duration: 500 }), // Anima el ancho de la barra
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.roundText}>Round: {round}</Text>
      <View style={styles.timerContainer}>
        <Animated.View style={[styles.timerBar, animatedStyle]} />
      </View>
    </View>
  )
}

export default Combat_Header

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: '#454545',
    position: 'absolute',
    top: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomEndRadius:15,
    borderBottomStartRadius:15
  },
  roundText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  timerContainer: {
    flex: 1,
    height: 20,
    backgroundColor: '#777',
    marginLeft: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  timerBar: {
    height: '100%',
    backgroundColor: '#a10b1d',
  },
})