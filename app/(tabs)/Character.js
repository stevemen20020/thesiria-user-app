import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import ApiService from '../../shared/services/apiService'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

const Character = () => {
  const [activeCharacter, setActiveCharacter] = useState(null)

  const apiService = new ApiService

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await apiService.getPlayerById(3)
      console.log(response.result)
      setActiveCharacter(response.result)
    }

    fetchCharacter()
    .catch((error) => console.error(error))
  },[])

  const calculateHealth = () => {
    return (activeCharacter.health * 100) / activeCharacter.max_health
  }

  const handleDetail = (mode) => {
    router.push({
      pathname: '/DetailAsset',
      params:{
        character: JSON.stringify(activeCharacter),
        mode:mode
      }
    })
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
      {activeCharacter !== null && activeCharacter !== undefined && (
        <>
        <View style={styles.emptyHeader}></View>
        <View style={styles.header}>
          <Text style={[styles.pill, {backgroundColor:activeCharacter.affinity.color}]}>{activeCharacter.races.race}</Text>
          <Image
            style={styles.icon}
            source={activeCharacter.image_reference === 'imagen.png' ? require('../../shared/images/ouroboros.png') : { uri: activeCharacter.image_reference}}
          />
          <Text style={[styles.pill, {backgroundColor:activeCharacter.affinity.color}]}>{activeCharacter.affinity.name}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.title}>{activeCharacter.name.toUpperCase()}</Text>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.healthContainer}>
            <View style={[styles.healthOverlay, {width: `${calculateHealth()}%`, backgroundColor:activeCharacter.affinity.color}]}></View>
            <View style={styles.healthBackground}></View>
            <Text style={styles.healthText}>{activeCharacter.health} / {activeCharacter.max_health}</Text>
          </View>
          <Text>Vida</Text>

          <View style={styles.leftAlign}>
            <Text>Oro: {activeCharacter.money.toLocaleString()}</Text>
            <Text>Mis stats:</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statRow}>
                <Text style={{flex:9}}>Agilidad</Text>
                <Text style={{flex:2}}>{activeCharacter.agility}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={{flex:9}}>Puntería</Text>
                <Text style={{flex:2}}>{activeCharacter.aim}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={{flex:9}}>Carisma</Text>
                <Text style={{flex:2}}>{activeCharacter.charisma}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={{flex:9}}>Defensa</Text>
                <Text style={{flex:2}}>{activeCharacter.defense}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={{flex:9}}>Destreza</Text>
                <Text style={{flex:2}}>{activeCharacter.dexterity}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={{flex:9}}>Manitas</Text>
                <Text style={{flex:2}}>{activeCharacter.handcraft}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={{flex:9}}>Velocidad</Text>
                <Text style={{flex:2}}>{activeCharacter.speed}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={{flex:9}}>Fuerza</Text>
                <Text style={{flex:2}}>{activeCharacter.strength}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={{flex:9}}>Visión</Text>
                <Text style={{flex:2}}>{activeCharacter.vision}</Text>
              </View>
            </View>

            {activeCharacter.weapon_id !== null && (
              <>
              <Text>Arma equipada:</Text>
              <TouchableOpacity style={styles.basicContainer} onPress={() => handleDetail('weapon')}>
                <Text style={{flex:7}}>{activeCharacter.inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.name}</Text>
                <Image
                  style={[styles.variedIcon,{flex:3}]}
                  source={{uri: activeCharacter.inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.image}}
                />
              </TouchableOpacity>
              </>
            )}

            {activeCharacter.armor_id !== null && (
              <>
              <Text>Arma equipada:</Text>
              <TouchableOpacity style={styles.basicContainer}>
                <Text style={{flex:7}}>{activeCharacter.inventory_armor_playable_character_armor_idToinventory_armor.armor.name}</Text>
                <Image
                  style={[styles.variedIcon,{flex:3}]}
                  source={{uri: activeCharacter.inventory_armor_playable_character_armor_idToinventory_armor.armor.image}}
                />
              </TouchableOpacity>
              </>
            )}

            {activeCharacter.titan !== null && (
              <>
              <Text>Titán:</Text>
              <TouchableOpacity style={styles.basicContainer}>
                <Text>Titan de ataque</Text>
              </TouchableOpacity>
              </>
            )}

            {activeCharacter.devil_fruit_id !== null && (
              <>
              <Text>Fruta del diablo:</Text>
              <TouchableOpacity style={styles.basicContainer}>
                <Text>{activeCharacter.devil_fruit.name}</Text>
              </TouchableOpacity>
              </>
            )}
          </View>

          <Text style={{marginTop:15, marginBottom:15}}>Mis pertenencias:</Text>
          <View style={styles.buttonBag}>
            <TouchableOpacity style={styles.button}>
              <MaterialIcons name="inventory" size={74} color={activeCharacter.affinity.color} />
              <Text>Inventario</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <MaterialCommunityIcons name="sword" size={74} color={activeCharacter.affinity.color} />
              <Text>Armas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <FontAwesome5 name="shield-alt" size={74} color={activeCharacter.affinity.color} />
              <Text>Armaduras</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.leftAlign}>
            <Text style={{marginTop:30}}>Mi biografía:</Text>
            <View style={styles.statsContainer}>
              <Text>{activeCharacter.biography}</Text>
            </View>
          </View>
          

        </View>
        <View style={styles.emptyFooter}></View>
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      width:'100%',
      height:'100%',
      padding:20,
    },
    emptyHeader: {
      height:50,
      width:'100%',
    },
    emptyFooter: {
      height:150,
      width:'100%',
    },
    header: {
      width:'100%',
      height:120,
      borderRadius:20,
      backgroundColor:'white',
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      padding:20
    },
    pill:{
      flex:1,
      padding:10,
      textAlign:'center',
      color:'white',
      fontSize:16,
      fontWeight:'600',
      borderRadius:15,
      overflow:'hidden'
    }, 
    icon:{
      resizeMode:'contain',
      height:90,
      width:90,
      flex:1,
    },
    nameContainer:{
      width:'100%',
      height:70,
      borderRadius:20,
      backgroundColor:'white',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      padding:20,
      marginTop:10
    },
    title:{
      fontSize:20,
      fontWeight:'600',
      letterSpacing:3
    },
    mainContainer:{
      width:'100%',
      borderRadius:20,
      backgroundColor:'white',
      display:'flex',
      alignItems:'center',
      flexDirection:'column',
      padding:20,
      marginTop:10,
      gap:10
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
      fontWeight:'400'
    },
    leftAlign: {
      width:'100%',
      display:'flex',
      gap:10,
      flexDirection:'column'
    },
    statsContainer: {
      backgroundColor:'#ECECEC',
      width:'100%',
      padding:10,
      borderRadius:15,
      display:'flex',
      flexDirection:'column',
      gap: 5
    },
    statRow:{
      display:'flex',
      flexDirection:'row'
    },
    basicContainer:{
      backgroundColor:'#ECECEC',
      width:'100%',
      padding:10,
      height:55,
      borderRadius:15,
      display:'flex',
      flexDirection:'row',
      alignItems:'center'
    },
    variedIcon:{
      height:40,
      width:40,
      resizeMode:'contain',
    },
    buttonBag:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      gap:35
    },
    button: {
      display:'flex',
      flexDirection:'column',
      gap:10,
      alignItems:'center',
      justifyContent:'center'
    }
  })

export default Character