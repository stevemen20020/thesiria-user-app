import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text>_header</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'red',
    width:'100%',
    height:'50%'
  }
});

export default Header