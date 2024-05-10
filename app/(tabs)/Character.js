import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import ApiService from '../../shared/services/apiService'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const Character = () => {
  const [character, setCharacter] = useState(null)
  const [health, setHealth] = useState(0)

  const apiService = new ApiService

  useEffect(() => {
    const fetchCharacterData = async () => {
      const response = await apiService.getCharacterById(3)
      setCharacter(response.result)
      setHealth((parseInt(response.result.health) / parseInt(response.result.max_health)) * 100)
    }

    fetchCharacterData()
    .catch( error => console.error(error))
  },[])

  const getLife = () => {
    return (character.health /character.maxHealth) * 100
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, {backgroundColor: character === null ? 'white' : character.affinity.color}]}>
      {character !== null ? (
        <>
        <View style={styles.emptyHeader}></View>
        <View style={styles.header}>
          <View style={[styles.info,{backgroundColor: character.affinity.color}]}>
            <Text style={styles.infoText}>{character.races.race}</Text>
          </View>
          <Image
            style={styles.characterImage}
            source={{ uri: 'https://thesiria.com/character-image/kamisato_ayaka_pj_rez.png'}}
          />
          <View style={[styles.info,{backgroundColor: character.affinity.color}]}>
            <Text style={styles.infoText}>{character.affinity.name}</Text>
          </View>
        </View>
        <View style={styles.bigName}>
          <Text style={styles.bigNameText}>{character.name.toUpperCase()}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.lifeBarContainer}>
            <View style={styles.lifeBar}></View>
            <View style={[styles.lifeBarOverlap, {backgroundColor:character.affinity.color, width:`${health}%`}]}></View>
            <Text style={styles.lifeText}>{character.health}/{character.max_health}</Text>
          </View>
          <Text>Vida</Text>
          <View style={styles.aligner}>
            <Text>Oro: {character.money.toLocaleString('es-ES', { style: 'currency', currency: 'MXN' })}</Text>
            <Text>Mis stats:</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statCont}>
                <Text style={{flex:9}}>Destreza</Text>
                <Text style={{flex:1}}>{character.dexterity}</Text>
              </View>
              <View style={styles.statCont}>
                <Text style={{flex:9}}>Fuerza</Text>
                <Text style={{flex:1}}>{character.strength}</Text>
              </View>
              <View style={styles.statCont}>
                <Text style={{flex:9}}>Agilidad</Text>
                <Text style={{flex:1}}>{character.agility}</Text>
              </View>
              <View style={styles.statCont}>
                <Text style={{flex:9}}>Puntería</Text>
                <Text style={{flex:1}}>{character.aim}</Text>
              </View>
              <View style={styles.statCont}>
                <Text style={{flex:9}}>Carisma</Text>
                <Text style={{flex:1}}>{character.charisma}</Text>
              </View>
              <View style={styles.statCont}>
                <Text style={{flex:9}}>Defensa</Text>
                <Text style={{flex:1}}>{character.defense}</Text>
              </View>
              <View style={styles.statCont}>
                <Text style={{flex:9}}>Manitas</Text>
                <Text style={{flex:1}}>{character.handcraft}</Text>
              </View>
              <View style={styles.statCont}>
                <Text style={{flex:9}}>Velocidad</Text>
                <Text style={{flex:1}}>{character.speed}</Text>
              </View>
              <View style={styles.statCont}>
                <Text style={{flex:9}}>Visión</Text>
                <Text style={{flex:1}}>{character.vision}</Text>
              </View>
            </View>

            {character.inventory_weapon_playable_character_weapon_idToinventory_weapon !== null && (
              <>
              <Text>Arma equipada:</Text>
              <View style={styles.anyContainer}>
                <Text style={{flex:7}}>{character.inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.name}</Text>
                <Image
                  style={styles.miniature}
                  source={{ uri: character.inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.image}}
                />
              </View>
              </>
            )}

            {character.inventory_armor_playable_character_armor_idToinventory_armor !== null && (
              <>
              <Text>Armadura equipada:</Text>
              <View style={styles.anyContainer}>
                <Text style={{flex:9}}>{character.inventory_armor_playable_character_armor_idToinventory_armor.armor.name}</Text>
                <Image
                  style={styles.miniature}
                  source={{ uri: character.inventory_armor_playable_character_armor_idToinventory_armor.armor.image}}
                />
              </View>
              </>
            )}

            {character.titan !== null && (
              <>
              <Text>Poder de titán:</Text>
              <View style={styles.anyContainer}>
                <Text>{character.titan}</Text>
              </View>
              </>
            )}

            {character.devil_fruit_id !== null && (
              <>
              <Text>Fruta del diablo:</Text>
              <View style={styles.anyContainer}>
                <Text>{character.devil_fruit.name}</Text>
              </View>
              </>
            )}

            <View style={styles.buttonBasket}>
              <Text>Mis pertenencias:</Text>
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.individualButton}>
                  <MaterialIcons name="inventory" size={64} color={character.affinity.color} />
                  <Text>Inventario</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.individualButton}>
                  <MaterialCommunityIcons name="sword" size={64} color={character.affinity.color} />
                  <Text>Armas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.individualButton}>
                  <FontAwesome5 name="shield-alt" size={64} color={character.affinity.color} />
                  <Text>Armaduras</Text>
                </TouchableOpacity>
              </View>   
            </View>

            <Text>Biografía:</Text>
              <View style={styles.anyContainer}>
                <Text>{character.biography}</Text>
              </View>
            
          </View>
        </View>
        <View style={styles.emptyContainer}></View>
        </>
      ) : (
        <Text>Cargando hoja de personaje...</Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 12,
    display:'flex',
    gap: 10,
  },  
  emptyContainer:{
    height:100
  },
  emptyHeader:{
    height:15
  },
  header: {
    height:140,
    width:'100%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    borderRadius:20,
    gap:10,
    padding:10
  },
  characterImage: {
    width:100,
    height:100,
    flex:1
  },
  info: {
    padding:10,
    borderRadius:20,
    flex:1,
  },
  infoText: {
    color:'white',
    fontWeight:'600',
    textAlign:'center'
  },
  bigName: {
    height:85,
    width:'100%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    borderRadius:20
  },
  bigNameText:{
    fontWeight:'600',
    fontSize:23
  },
  content: {
    borderRadius:20,
    width:'100%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    backgroundColor:'white',
    padding:10,
    flexDirection:'column'
  },
  lifeBarContainer: {
    position:'relative',
    width:'100%',
    height:45,
    backgroundColor:'transparent',
    display:'flex',
    justifyContent:'center'
  }, 
  lifeBar: {
    width:'100%',
    position:'absolute',
    height:'100%',
    backgroundColor:'#ededed',
    borderRadius:15,
    zIndex:1
  },
  lifeBarOverlap: {
    position:'absolute',
    height:'100%',
    borderRadius:15,
    zIndex:2
  },
  lifeText: {
    width:'100%',
    textAlign:'center',
    zIndex:3,
    fontWeight:'600'
  },
  aligner:{
    width:'100%',
    display:'flex',
    flexDirection:'column',
    gap:10
  },
  statsContainer:{
    backgroundColor:'#ededed',
    borderRadius:5,
    padding:10,
    display:'flex',
    flexDirection:'column',
    gap:5
  },
  statCont: {
    display:'flex',
    flexDirection:'row'
  },
  anyContainer:{
    backgroundColor:'#ededed',
    borderRadius:5,
    padding:10,
    display:'flex',
    flexDirection:'row',
    gap:5,
    alignItems:'center',
  },
  miniature:{
    height:40,
    width:40,
    flex:3,
    resizeMode:'contain'
  },
  buttonBasket:{
    display:'flex',
    flexDirection:'column',
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    gap:20
  },
  buttons: {
    display:'flex',
    flexDirection:'row',
    gap:30,
    alignItems:'center',
    justifyContent:'center'
  },
  individualButton: {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    gap:10
  }
})

export default Character