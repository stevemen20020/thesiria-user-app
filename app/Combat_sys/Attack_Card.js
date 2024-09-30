import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Attack_Card = (props) => {
  const colorParser = (color) => {
    switch(color) {
      case 'Fuego':
        return '#b81442'
      default:
        return 'white'
    }
  }

  return (
    <View style={[styles.container, {backgroundColor:colorParser(props.attack.weapon.elements.name)}]}>
      {props.attack.weapon_type === 1 && (
        <FontAwesome6  name="hand-fist" size={25} color={'black'} />
      )}
      {props.attack.weapon_type === 2 && (
        <MaterialCommunityIcons name="bow-arrow" size={25} color={'black'} />
      )}
      {props.attack.weapon_type === 3 && (
        <MaterialCommunityIcons  name="fruit-grapes" size={25} color={'black'} />
      )}
    </View>
  )
}

export default Attack_Card

const styles = StyleSheet.create({
  container:{
    width:50,
    height:"100%",
    backgroundColor:'green',
    marginHorizontal:5,
    display:"flex",
    alignItems:'center',
    justifyContent:'center',
    borderRadius:15
  }
})