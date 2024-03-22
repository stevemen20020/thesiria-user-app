import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Journal = () => {

  const handlePushMissions = () => {
    router.push('/JournalMission')
  }

  const handlePushCharacters = () => {
    console.log('Yendo a personajes')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={handlePushMissions}>
        <MaterialCommunityIcons name="notebook" size={134} color="#d0e1d3" />
        <Text>Misiones</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={handlePushCharacters}>
        <FontAwesome5 name="users" size={134} color="#d0e1d3" />
        <Text>Personajes</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:'100%',
    display:'flex',
    flexDirection:'column',
    gap:40
  },
  card:{
    backgroundColor:'white',
    width:'80%',
    height:270,
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center',
    display:'flex',
    flexDirection:'column',
    gap:25
  }
})

export default Journal