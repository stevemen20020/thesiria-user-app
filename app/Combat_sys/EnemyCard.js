import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Octicons from '@expo/vector-icons/Octicons';

const EnemyCard = (props) => {

  return (
    <View style={styles.container}>
      <View style={styles.informationContainer}>
        <View style={styles.titleContainer}>
          <Image source={{uri: props.enemy.weapon !== null ? props.enemy.weapon.image : null}} style={styles.weapon}/>
          <View style={styles.texts}>
            <Text style={styles.enemyName}>{props.enemy.name}</Text>
            <Text>
              <Octicons name="heart-fill" size={14} color="black" />
                {'  '}{props.enemy.health} / {props.enemy.max_health}
            </Text>
          </View>
          
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: props.enemy.image_reference}} style={styles.image}/>
      </View>
    </View>
  );
};

export default EnemyCard;

const styles = StyleSheet.create({
  container:{
    padding:5,
    width:'100%',
    height:150,
    backgroundColor:'rgba(255,255,255,0.5)',
    borderRadius:20,
    display:'flex',
    flexDirection:'row'
  },
  informationContainer:{
    flex:2,
    display:'flex',
    flexDirection:'column'
  },
  imageContainer:{
    flex:1
  },
  image:{
    height:140,
    resizeMode:'cover',
  },
  titleContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  weapon:{
    height:50,
    width:50,
    flex:3,
    resizeMode:'contain'
  },
  enemyName:{
    fontWeight:'600',
    fontSize:18,
    textAlign:'center'
  },
  texts:{
    display:'flex',
    flexDirection:'column',
    flex:7,
    alignItems:'center',
    justifyContent:'center'
  }
})
