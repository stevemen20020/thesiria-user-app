import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Attacks = () => {
  return (
    <View style={styles.container}>
      <Text>Attacks</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:'100%'
  }
})

export default Attacks