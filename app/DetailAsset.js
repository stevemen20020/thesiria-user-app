import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Animated, { useDerivedValue, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ApiService from '../shared/services/apiService';

const DetailAsset = () => {
  const [activeWeapon, setActiveWeapon] = useState(null)
  const [activeArmor, setActiveArmor] = useState(null)
  const [mode, setMode] = useState('inactive')

  const localValues = useLocalSearchParams()
  const apiService = new ApiService

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
    console.log(decData)
    setActiveWeapon(decData.inventory_weapon_playable_character_weapon_idToinventory_weapon)
    setActiveArmor(decData.inventory_armor_playable_character_armor_idToinventory_armor)
    setMode(localValues.mode)
  },[])

  const handleUpgradeWeapon = () => {
    const upgradeCost = getUpgradeCost()
    Alert.alert(
      'Mejorar arma.',
      `¿Seguro que deseas mejorar el arma ${activeWeapon.weapon.name} al nivel ${activeWeapon.level + 1}? Costará ${upgradeCost} de ${activeWeapon.weapon.objects.name}`,
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Mejorar',
          onPress: () => {upgradeWeapon()},
          style: 'destructive',
        }
      ]
    )
  }

  const handleUpgradeArmor = () => {
    const upgradeCost = getUpgradeCost()
    Alert.alert(
      'Mejorar armadura.',
      `¿Seguro que deseas mejorar el armadura ${activeArmor.armor.name} al nivel ${activeArmor.level + 1}? Costará ${upgradeCost} de ${activeArmor.armor.objects.name}`,
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Mejorar',
          onPress: () => {upgradeWeapon()},
          style: 'destructive',
        }
      ]
    )
  }

  const upgradeWeapon = async () => {
    if(mode === 'weapon'){
      const inventory = await apiService.getSpecificInventory(3, activeWeapon.weapon.objects.id)
      console.log(inventory)
      if('error' in inventory) {
        Alert.alert('No se cuenta con dicho objeto')
        return
      }

      if(inventory.result[0].quantity < getUpgradeCost()){
        Alert.alert('No se cuenta con suficientes ejemplares de dicho objeto')
        return
      }

      const body = {
        level: activeWeapon.level + 1
      }

      const body_2 ={
        id_playable_character: 3,
        id_object:activeWeapon.weapon.objects.id,
        quantity: inventory.result[0].quantity - getUpgradeCost()
      }
      const upgradedWeapon = await apiService.upgradeWeapon(activeWeapon.id, body)
      const spentMaterials = await apiService.patchInventory(body_2)

      alert('Arma mejorada')

      let arma = activeWeapon
      arma.level = arma.level + 1

      setActiveWeapon(arma)
    } else if (mode === 'armor') {
      const inventory = await apiService.getSpecificInventory(3, activeArmor.armor.objects.id)
      console.log(inventory)
      if('error' in inventory) {
        Alert.alert('No se cuenta con dicho objeto')
        return
      }

      if(inventory.result[0].quantity < getUpgradeCost()){
        Alert.alert('No se cuenta con suficientes ejemplares de dicho objeto')
        return
      }

      const body = {
        level: activeArmor.level + 1
      }

      const body_2 ={
        id_playable_character: 3,
        id_object:activeArmor.armor.objects.id,
        quantity: inventory.result[0].quantity - getUpgradeCost()
      }
      const upgradedWeapon = await apiService.upgradeArmor(activeArmor.id, body)
      const spentMaterials = await apiService.patchInventory(body_2)

      alert('Arma mejorada')

      let armadura = activeArmor
      armadura.level = armadura.level + 1

      setActiveArmor(armadura)
    }
  }

  const getUpgradeCost = () => {
    if(mode === 'weapon'){
      const level = activeWeapon.level + 1
      if(level === 2) return activeWeapon.weapon.upgrade_cost_lvl2
      if(level === 3) return activeWeapon.weapon.upgrade_cost_lvl3
      if(level === 4) return activeWeapon.weapon.upgrade_cost_lvl4
      if(level === 5) return activeWeapon.weapon.upgrade_cost_lvl5
    } else if (mode === 'armor') {
      const level = activeArmor.level + 1
      if(level === 2) return activeArmor.armor.upgrade_cost_lvl2
      if(level === 3) return activeArmor.armor.upgrade_cost_lvl3
      if(level === 4) return activeArmor.armor.upgrade_cost_lvl4
      if(level === 5) return activeArmor.armor.upgrade_cost_lvl5
    }
    return 0
  }

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.dice, animationStyle]}
        source={require('../shared/images/ouroboros.png')}
      />
      <ScrollView style={styles.scroll}>
      <View style={styles.mainContainer}>

        {activeWeapon !== null && mode === 'weapon' && (
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
              <View style={styles.upgradeWeaponContainer}>
                <Text>Mejorar arma: </Text>
                <TouchableOpacity style={styles.upgradeWeapon} onPress={handleUpgradeWeapon}>
                  <Text style={{fontWeight:'600'}}>Mejorar</Text>
                  <MaterialCommunityIcons name="anvil" size={30} color="black" />
                </TouchableOpacity>
              </View>
            )}
            
          </>
        )} 


        {activeArmor !== null && mode === 'armor' && (
          <>
            <Text style={styles.title}>{activeArmor.armor.name} | Nivel {activeArmor.level}</Text>
            <Image
              style={styles.image}
              source={{ uri: activeArmor.armor.image}}
            />

            <View style={styles.dataContainer}>
              <View>
                <Text style={styles.datos}>Rareza</Text>
                <View style={styles.line}></View>
                {activeArmor.armor.rarity === 1 && (<Text>Común</Text>)}
                {activeArmor.armor.rarity === 2 && (<Text>Poco común</Text>)}
                {activeArmor.armor.rarity === 3 && (<Text>Raro</Text>)}
                {activeArmor.armor.rarity === 4 && (<Text>Épico</Text>)}
                {activeArmor.armor.rarity === 5 && (<Text>Legendario</Text>)}
              </View>
              <View style={styles.verticalSeparator}/>
              <View>
                <Text style={styles.datos}>Elemento</Text>
                <View style={styles.line}></View>
                <Text>{activeArmor.armor.elements.name}</Text>
              </View>
              <View style={styles.verticalSeparator}/>
              <View>
                <Text style={styles.datos}>Objeto de mejora</Text>
                <View style={styles.line}></View>
                <Text>{activeArmor.armor.objects.name}</Text>
              </View>
            </View>
            
            <Text style={styles.datos}>Descripción:</Text>
            <Text style={[styles.description, {fontStyle:'italic'}]}>"{activeArmor.armor.description}"</Text>
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
                <Text style={styles.columnText}>{activeArmor.armor.defensive_points_lvl1} pts.</Text>
                <Text style={styles.columnText}>{activeArmor.armor.defensive_points_lvl2} pts.</Text>
                <Text style={styles.columnText}>{activeArmor.armor.defensive_points_lvl3} pts.</Text>
                <Text style={styles.columnText}>{activeArmor.armor.defensive_points_lvl4} pts.</Text>
                <Text style={styles.columnText}>{activeArmor.armor.defensive_points_lvl5} pts.</Text>
              </View>

              <View style={styles.column}>
                <Text style={styles.columnHeader}>Requisitos</Text>
                <Text style={styles.columnText}>N/A</Text>
                <Text style={styles.columnText}>{activeArmor.armor.upgrade_cost_lvl2} unidades</Text>
                <Text style={styles.columnText}>{activeArmor.armor.upgrade_cost_lvl3} unidades</Text>
                <Text style={styles.columnText}>{activeArmor.armor.upgrade_cost_lvl4} unidades</Text>
                <Text style={styles.columnText}>{activeArmor.armor.upgrade_cost_lvl5} unidades</Text>
              </View>
            </View>

            {activeArmor.level !== 5 && (
              <View style={styles.upgradeWeaponContainer}>
                <Text>Mejorar armadura: </Text>
                <TouchableOpacity style={styles.upgradeWeapon} onPress={handleUpgradeArmor}>
                  <Text style={{fontWeight:'600'}}>Mejorar</Text>
                  <MaterialCommunityIcons name="anvil" size={30} color="black" />
                </TouchableOpacity>
              </View>
            )}
            
          </>
        )} 


        {activeWeapon === null && activeArmor === null &&(
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
    padding:5,
    backgroundColor:'#d0e1d3',
    borderRadius:5,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    marginLeft:20
  },
  upgradeWeaponContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection:'row',
    alignItems:'center',
    width:'100%'
  }
})

export default DetailAsset