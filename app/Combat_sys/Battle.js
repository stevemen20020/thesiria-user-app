import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import Enemy_Carousel from './Enemy_Carousel'
import BattleViewModel from './ViewModel'

const Battle = () => {

  const { npcs } = BattleViewModel()

  return (
    <View style={styles.container}>
        <Text>Hola</Text>
        <Enemy_Carousel enemyData={npcs}/>
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
    },
  });