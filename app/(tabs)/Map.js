import { View, Text, StyleSheet } from 'react-native'
import React from 'react'


const Map = () => {
  return (
    <View style={styles.page}>
        <View style={styles.container}>
        </View>
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