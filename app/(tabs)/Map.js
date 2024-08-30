import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

const Map = () => {
  return (
    <View style={styles.page}>
        <View style={styles.container}>
        </View>
        <Button onPress={() => {router.push('/battle')}} title='Pelea'/>
      </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: 'tomato'
  },
  map: {
    flex: 1
  }
})

export default Map