import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Button_Panel = ( props ) => {

  const calculateHealth = () => {
    return (props.character.health * 100) / props.character.max_health
  }


  return (
    <View style={styles.container}>
      {props.character && (
        <>
          <View style={styles.healthContainer}>
            <View style={[styles.healthOverlay, {width: `${calculateHealth()}%`, backgroundColor:'#4a1213'}]}></View>
            <View style={styles.healthBackground}></View>
            <Text style={styles.healthText}>{props.character.health} / {props.character.max_health}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, {backgroundColor:'#124a24'}]}>
              <MaterialIcons name="inventory" size={24} color="white" />
              <Text style={styles.buttonText}>
                Inventario
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor:'#4a1241'}]}>
              <MaterialCommunityIcons name="sword-cross" size={24} color="white" />
              <Text style={styles.buttonText}>
                Atacar
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, {backgroundColor:'#4a4612'}]}>
              <MaterialCommunityIcons name="run" size={24} color="white" />
              <Text style={styles.buttonText}>
                Huir
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor:'#12334a'}]}>
              <FontAwesome name="exchange" size={24} color="white" />
              <Text style={styles.buttonText}>
                Cambiar de arma
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )
}

export default Button_Panel

const styles = new StyleSheet.create({
  container:{
    display:'flex',
    height:300,
    width:'100%',
    position:'absolute',
    bottom:0,
    left:0,
    right:9,
    padding:20,
    flexDirection:'column',
    gap:10,
    borderTopRightRadius:30,
    borderTopLeftRadius:30,
    backgroundColor:'#454545'
  },
  buttonContainer:{
    display:"flex",
    flexDirection:'row',
    flex:1,
    gap:10,
  },
  button:{
    display:'flex',
    alignItems:"center",
    justifyContent:'center',
    backgroundColor:'#1a1a1a',
    borderRadius:15,
    flex:1
  },
  buttonText:{
    color:'white'
  },
  healthContainer: {
    height:40,
    width:'100%',
    position:'relative',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  healthOverlay: {
    position: 'absolute',
    height: '100%',
    borderRadius: 15,
    zIndex: 2,
    left:0
  },
  healthBackground: {
    width: '100%',
    position: 'absolute',
    height: '100%',
    backgroundColor: '#ededed',
    borderRadius: 15,
    zIndex: 1,
    backgroundColor:'#ECECEC'
  },
  healthText:{
    zIndex:3,
    fontWeight:'400',
    color:"white"
  },
})