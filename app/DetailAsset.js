import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Animated, { useDerivedValue, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DetailAsset = () => {
  const [activeWeapon, setActiveWeapon] = useState(null)
  const [mode, setMode] = useState('inactive')

  const localValues = useLocalSearchParams()

  const animation = useSharedValue(0)
  const rotation = useDerivedValue(() => {
    return animation.value; // Simplemente tomar el valor directamente
  });
  
  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` } // Usar el valor directamente
      ]
    };
  });

  const startAnimation = () => {
    animation.value = withTiming(-1000, {duration:80000})
  }

  useEffect(() => {
    startAnimation()
  },[activeWeapon])

  useEffect(() => {
    const decData = JSON.parse(localValues.character)
    setActiveWeapon(decData.inventory_weapon_playable_character_weapon_idToinventory_weapon)
    setMode(localValues.mode)
  },[])

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.dice, animationStyle]}
        source={require('../shared/images/ouroboros.png')}
      />
      <ScrollView style={styles.scroll}>
      <View style={styles.mainContainer}>

        {activeWeapon !== null ? (
          <>
            <Text style={styles.title}>{activeWeapon.weapon.name} | Nivel {activeWeapon.level}</Text>
            <Image
              style={styles.image}
              source={{ uri: activeWeapon.weapon.image}}
            />

            <View style={styles.dataContainer}>
              <View>
                <Text style={styles.datos}>Rareza</Text>
                <View style={styles.line}></View>
                {activeWeapon.weapon.rarity === 1 && (<Text>Común</Text>)}
                {activeWeapon.weapon.rarity === 2 && (<Text>Poco común</Text>)}
                {activeWeapon.weapon.rarity === 3 && (<Text>Raro</Text>)}
                {activeWeapon.weapon.rarity === 4 && (<Text>Épico</Text>)}
                {activeWeapon.weapon.rarity === 5 && (<Text>Legendario</Text>)}
              </View>
              <View style={styles.verticalSeparator}/>
              <View>
                <Text style={styles.datos}>Elemento</Text>
                <View style={styles.line}></View>
                <Text>{activeWeapon.weapon.elements.name}</Text>
              </View>
              <View style={styles.verticalSeparator}/>
              <View>
                <Text style={styles.datos}>Objeto de mejora</Text>
                <View style={styles.line}></View>
                <Text>{activeWeapon.weapon.objects.name}</Text>
              </View>
            </View>
            
            <Text style={styles.datos}>Descripción:</Text>
            <Text style={[styles.description, {fontStyle:'italic'}]}>"{activeWeapon.weapon.description}"</Text>
            <Text style={styles.datos}>Stats:</Text>
            <View style={styles.table}>

              <View style={styles.column}>
                <Text style={styles.columnHeader}>Nivel</Text>
                <Text style={styles.columnText}>1</Text>
                <Text style={styles.columnText}>2</Text>
                <Text style={styles.columnText}>3</Text>
                <Text style={styles.columnText}>4</Text>
                <Text style={styles.columnText}>5</Text>
              </View>

              <View style={styles.column}>
                <Text style={styles.columnHeader}>Puntos de daño</Text>
                <Text style={styles.columnText}>{activeWeapon.weapon.damage_points_lvl1} pts.</Text>
                <Text style={styles.columnText}>{activeWeapon.weapon.damage_points_lvl2} pts.</Text>
                <Text style={styles.columnText}>{activeWeapon.weapon.damage_points_lvl3} pts.</Text>
                <Text style={styles.columnText}>{activeWeapon.weapon.damage_points_lvl4} pts.</Text>
                <Text style={styles.columnText}>{activeWeapon.weapon.damage_points_lvl5} pts.</Text>
              </View>

              <View style={styles.column}>
                <Text style={styles.columnHeader}>Requisitos</Text>
                <Text style={styles.columnText}>N/A</Text>
                <Text style={styles.columnText}>{activeWeapon.weapon.upgrade_cost_lvl2} unidades</Text>
                <Text style={styles.columnText}>{activeWeapon.weapon.upgrade_cost_lvl3} unidades</Text>
                <Text style={styles.columnText}>{activeWeapon.weapon.upgrade_cost_lvl4} unidades</Text>
                <Text style={styles.columnText}>{activeWeapon.weapon.upgrade_cost_lvl5} unidades</Text>
              </View>
            </View>

            {activeWeapon.level !== 5 && (
              <>
              <TouchableOpacity style={styles.upgradeWeapon}>
                <MaterialCommunityIcons name="anvil" size={140} color="white" />
              </TouchableOpacity>
              </>
            )}
            
          </>
        ) : (
          <>
            <Text style={styles.title}>tas nulo</Text>
          </>
        )}


      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    height:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-end',
    position:'relative',
    backgroundColor:'#d0e1d3'
  },
  mainContainer:{
    height:'100%',
    width:'100%',
    backgroundColor:'white',
    padding:30,
    borderTopLeftRadius:45,
    borderTopRightRadius:45,
    zIndex:3,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    overflow:'scroll',
    gap:20
  },
  scroll:{
    height:'80%',
    width:'100%',
    backgroundColor:'white',
    borderTopLeftRadius:45,
    borderTopRightRadius:45,
    zIndex:2,
    position:'absolute',
    bottom:0
  },
  dice:{
    position:'absolute',
    zIndex:2,
    top:30,
    right:-110,
    height:480,
    width:480,
    opacity:0.20,
  },
  title:{
    fontSize:25,
    fontWeight:"600",
    textAlign:'center',
    padding:5,
    paddingHorizontal:15,
    borderRadius:20,
    overflow:'hidden',
    color:'white',
    backgroundColor:'#d0e1d3'
  },
  description:{
    fontSize:14,
    textAlign:'justify',
    marginBottom:10
  },
  image: {
    height:250,
    width:250
  },
  dataContainer:{
    display:'flex',
    flexDirection:'row',
    marginBottom:20,
    gap:20
  },
  verticalSeparator: {
    height:'100%',
    width:1,
    backgroundColor:'black'
  },
  datos: {
    textAlign:'center',
    marginBottom:2,
    paddingBottom:2,
    borderBottomColor:"#d0e1d3",
    borderBottomWidth:2,
  },
  line:{
    width:'100%',
    height:1,
    backgroundColor:'#d0e1d3',
    marginVertical:2
  },
  column: {
    flex:1,
    display:'flex',
    flexDirection:'column',
    gap:5
  },
  table: {
    display:'flex',
    flexDirection:'row',
    width:'100%'
  },
  columnHeader: {
    textAlign:'center',
    fontWeight:'600'
  },
  columnText: {
    textAlign:'center',
  },
  upgradeWeapon:{
    marginVertical:10,
    backgroundColor:"#d0e1d3",
    padding:20,
    borderRadius:15
  }
})

export default DetailAsset