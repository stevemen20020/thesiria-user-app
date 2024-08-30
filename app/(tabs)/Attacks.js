import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'
import { useState, useEffect, useCallback } from 'react'
import { AntDesign } from '@expo/vector-icons';
import ApiService from '../../shared/services/apiService'
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import Toast from 'react-native-root-toast'
import { useFocusEffect } from 'expo-router';

const Attacks = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [magicOpen, setMagicOpen] = useState(false)
  const [myAttacks, setMyAttacks] = useState(null)
  const [favoriteAttacks, setFavoriteAttacks] = useState(null)
  const [activeUser, setActiveUser] = useState(null)
  const [melee, setMelee] = useState(false)
  const [distance, setDistance] = useState(false)
  const [devilFruit, setDevilFruit] = useState(false)
  const [group, setGroup] = useState(false)
  const [individual, setIndividual] = useState(false)
  const [attackName, setAttackName] = useState('')
  const [spells, setSpells] = useState(null)

  const apiService = new ApiService

  useFocusEffect(
    useCallback(() => {
      const fetchAttacks = async () => {
        const response = await apiService.getMyAttacks(3)
  
        if(response.result !== undefined && response.result !== null) {
          setMyAttacks(response.result)
          const favs = []
          response.result.forEach(attack => {
            if(attack.favorite === 1) favs.push(attack)
          })
          setFavoriteAttacks(favs)
        }
      }
  
      const fetchCharacter = async () => {
        const response = await apiService.getPlayerById(3)
        setActiveUser(response.result)
      }

      const fetchSpells = async() => {
        const response = await apiService.getMySpells(3)
        if(response.result !== undefined && response.result !== null) {
          setSpells(response.result)
        }
      }
  
      fetchAttacks()
      .catch((error) => console.error(error))
      fetchCharacter()
      .catch((error) => console.error(error))
      fetchSpells()
      .catch((error) => console.error(error))
      return () => {}
    },[])
  )

  handlePressMelee = () => {
    setMelee (true)
    setDistance (false)
    setDevilFruit (false)
  }

  handlePressDevilFruit = () => {
    setMelee (false)
    setDistance (false)
    setDevilFruit (true)
  }

  handlePressDistance = () => {
    setMelee (false)
    setDistance (true)
    setDevilFruit (false)
  }

  handlePressIndividual = () => {
    setIndividual(true)
    setGroup(false)
  }

  handlePressGroup = () => {
    setIndividual(false)
    setGroup(true)
  }

  setFavorite = async (attack) => {
    if(favoriteAttacks.length > 9) {
      Alert.alert('Límite alcanzado', 'Has alcanzado el límite de ataques favoritos')
      return
    }
  
    const body = {
      favorite: 1
    }
    await apiService.putAttackById(attack.id, body)
  
    setMyAttacks(prevAttacks => 
      prevAttacks.map(prevAttack => 
        prevAttack.id === attack.id ? { ...prevAttack, favorite: 1} : prevAttack
      )
    )
  
    setFavoriteAttacks(prevAttacks => [...prevAttacks, attack])
  }

  setUnFavorite = async (attack) => {  
    const body = {
      favorite: 0
    }
    await apiService.putAttackById(attack.id, body)
  
    setMyAttacks(prevAttacks => 
      prevAttacks.map(prevAttack => 
        prevAttack.id === attack.id ? { ...prevAttack, favorite: 0} : prevAttack
      )
    )
  
    setFavoriteAttacks(prevAttacks => 
      prevAttacks.filter(prevAttack => prevAttack.id !== attack.id)
    )
  }
  
  handleDeleteAttack = async (attack) => {
    await apiService.deleteAttack(attack.id)
    setFavoriteAttacks(prevAttacks => 
      prevAttacks.filter(prevAttack => prevAttack.id !== attack.id)
    )

    setMyAttacks(prevAttacks => 
      prevAttacks.filter(prevAttack => prevAttack.id !== attack.id)
    )
  }

  handleRegisterAttack = async () => {
    if(melee === false && distance === false && devilFruit === false) {
      Alert.alert('Putote','Indica el rango del ataque.')
      return
    }

    if(group === false && individual === false) {
      Alert.alert('Todavía más putote','Indica los objetivos del ataque.')
      return
    }

    if(attackName === '') {
      Alert.alert('Infinitamente putote','Indica el nombre de tu ataque.')
      return
    }

    let weaponType = 0
    let attackType = 0

    if(melee) weaponType = 1
    if(distance) weaponType = 2
    if(devilFruit) weaponType = 3

    if(individual) attackType = 1
    if(group) attackType = 2

    const body = {
      id_playable_character:3,
      name:attackName,
      weapon_type: weaponType,
      attack_type: attackType
    }

    const response = await apiService.insertAttack(body)
    console.log(response)
    let toast = Toast.show('El ataque ha sido enviado al gei master.', {
      duration: Toast.durations.LONG,
    });
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.emptyTopContainer}/>
      {myAttacks !== null && activeUser !== null && (
        <>
        <TouchableOpacity style={styles.menuOpener} onPress={() => setMenuOpen(!menuOpen)}>
          <Text style={styles.menuOpenerText}>Mis ataques</Text>
          <AntDesign name={menuOpen ? 'caretdown' : 'caretright'} size={18} color="black" />
        </TouchableOpacity>


        <View style={[styles.contentContainer, {height: menuOpen ? '75%' : '5%'}]}>
        {favoriteAttacks !== null && menuOpen && (
          <>
          <Text style={{marginBottom:5}}>Ataques favoritos: {favoriteAttacks.length}/10</Text>
          <ScrollView style={styles.attacksContainer}>
            {favoriteAttacks.map((attack, index) => (
              <Menu key={index}>
                <MenuTrigger style={styles.attack} >
                  {attack.weapon_type === 1 && (
                    <FontAwesome6 style={{flex:1}} name="hand-fist" size={17} color={attack.playable_character.affinity.color} />
                  )}
                  {attack.weapon_type === 2 && (
                    <MaterialCommunityIcons style={{flex:1}} name="bow-arrow" size={17} color={attack.playable_character.affinity.color} />
                  )}
                  {attack.weapon_type === 3 && (
                    <MaterialCommunityIcons style={{flex:1}} name="fruit-grapes" size={17} color={attack.playable_character.affinity.color} />
                  )}
                  <Text style={{flex:5, fontSize:12}}>{attack.name}</Text>
                  {attack.attack_type === 1 && (
                    <FontAwesome style={{flex:1}} name="group" size={17} color={attack.playable_character.affinity.color} />
                  )}
                  {attack.attack_type === 2 && (
                    <FontAwesome style={{flex:1}} name="user" size={17} color={attack.playable_character.affinity.color} />
                  )}
                  
                  <Text style={{flex:5, textAlign:'right', fontSize:12}}>{attack.uses}/{attack.max_uses} - {attack.attack_points} pts</Text>
                </MenuTrigger>
                <MenuOptions>
                  {attack.favorite === 1 ? (
                    <MenuOption onSelect={() => setUnFavorite(attack)} text='Eliminar de favorito' />
                  ) : (
                    <MenuOption onSelect={() => setFavorite(attack)} text='Agregar a favorito' />
                  )}
                  
                  
                  <MenuOption onSelect={() => handleDeleteAttack(attack)} text='Borrar ataque' />
                </MenuOptions>
              </Menu>
            ))}
          </ScrollView>

          <Text style={{marginBottom:5, marginTop:15}}>Todos mis ataques </Text>
          <ScrollView style={styles.attacksContainer}>
            {myAttacks.map((attack, index) => (
              <Menu key={index}>
                <MenuTrigger style={styles.attack} >
                  {attack.weapon_type === 1 && (
                    <FontAwesome6 style={{flex:1}} name="hand-fist" size={17} color={attack.playable_character.affinity.color} />
                  )}
                  {attack.weapon_type === 2 && (
                    <MaterialCommunityIcons style={{flex:1}} name="bow-arrow" size={17} color={attack.playable_character.affinity.color} />
                  )}
                  {attack.weapon_type === 3 && (
                    <MaterialCommunityIcons style={{flex:1}} name="fruit-grapes" size={17} color={attack.playable_character.affinity.color} />
                  )}
                  <Text style={{flex:5, fontSize:12}}>{attack.name}</Text>
                  {attack.attack_type === 1 && (
                    <FontAwesome style={{flex:1}} name="group" size={17} color={attack.playable_character.affinity.color} />
                  )}
                  {attack.attack_type === 2 && (
                    <FontAwesome style={{flex:1}} name="user" size={17} color={attack.playable_character.affinity.color} />
                  )}
                  <Text style={{flex:5, textAlign:'right', fontSize:12}}>{attack.uses}/{attack.max_uses} - {attack.attack_points} pts</Text>
                </MenuTrigger>
                <MenuOptions>
                  {attack.favorite === 1 ? (
                    <MenuOption onSelect={() => setUnFavorite(attack)} text='Eliminar de favorito' />
                  ) : (
                    <MenuOption onSelect={() => setFavorite(attack)} text='Agregar a favorito' />
                  )}
                  
                  
                  <MenuOption onSelect={() => handleDeleteAttack(attack)} text='Borrar ataque' />
                </MenuOptions>
              </Menu>
            ))}
          </ScrollView>
          <Text style={{marginBottom:5, marginTop:15}}>Crear un ataque nuevo: </Text>
          <View style={[styles.buttonsContainer,{marginTop:10}]}>
            <View style={[styles.buttonsContainer, {flex: 1}]}>
              <TouchableOpacity onPress={handlePressMelee}>
                <FontAwesome6 name="hand-fist" size={20} color={melee ? activeUser.affinity.color : 'black'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePressDistance}>
                <MaterialCommunityIcons name="bow-arrow" size={20} color={distance ? activeUser.affinity.color : 'black'} />
              </TouchableOpacity>
              { activeUser.devil_fruit_id !== null && (
                <TouchableOpacity onPress={handlePressDevilFruit}>
                  <MaterialCommunityIcons name="fruit-grapes" size={20} color={devilFruit ? activeUser.affinity.color : 'black'} />
                </TouchableOpacity>
              )}
            </View>

            <View style={[styles.buttonsContainer, {flex: 1, justifyContent:'flex-end'}]}>
              <TouchableOpacity onPress={handlePressGroup}>
                <FontAwesome name="group" size={20} color={group ? activeUser.affinity.color : 'black'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePressIndividual}>
                <FontAwesome name="user" size={20} color={individual ? activeUser.affinity.color : 'black'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.buttonsContainer, {marginTop:10}]}>
            <TextInput style={styles.input} onChangeText={(text) => setAttackName(text)}/>
            <TouchableOpacity style={styles.sendButton} onPress={() => handleRegisterAttack()}>
              <Text>Enviar</Text>
            </TouchableOpacity>
          </View>
          

          </>
        )}
        </View>

        <TouchableOpacity style={[styles.menuOpener, {marginTop:10}]} onPress={() => setMagicOpen(!magicOpen)}>
          <Text style={styles.menuOpenerText}>Mis magias</Text>
          <AntDesign name={magicOpen ? 'caretdown' : 'caretright'} size={18} color="black" />
        </TouchableOpacity>

        <View style={[styles.contentContainer, {height: magicOpen ? '55%' : '5%'}]}>
        {spells !== null && magicOpen && (
          <>
          <Text style={{marginBottom:5, marginTop:15}}>Hechizos conocidos </Text>
          <ScrollView style={styles.attacksContainer}>
            {spells.map((spell, index) => (
              <Menu key={index}>
                <MenuTrigger style={styles.attack} >
                  <Text style={{flex:5, fontSize:12}}>{spell.spells.name}</Text>
                  {spell.spells.is_group === 1 && (
                    <FontAwesome style={{flex:1}} name="group" size={17} color={'black'} />
                  )}
                  {spell.spells.is_group === 0 && (
                    <FontAwesome style={{flex:1}} name="user" size={17} color={'black'} />
                  )}
                  <Text style={{flex:2, fontSize:12}}>Lvl. {spell.level}</Text>
                  
                  <Text style={{flex:5, textAlign:'right', fontSize:12}}>{spell.uses}/{spell.spells.max_uses} - {spell.spells.effect}</Text>
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption onSelect={() => console.log('hola')} text='Mejorar magia' />
                  <MenuOption onSelect={() => console.log('hola')} text='Descripción' />
                </MenuOptions>
              </Menu>
            ))}
          </ScrollView>
          </>
        )}
        </View>
        </>
      )}
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    padding:20,
  },
  emptyTopContainer: {
    height:20
  },
  menuOpener:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:20,
  },
  menuOpenerText: {
    fontWeight:'600',
    fontSize:18
  },
  contentContainer: {
    backgroundColor:'white',
    borderRadius:20,
    marginTop:15,
    padding:15
  },
  attacksContainer: {
    backgroundColor:'#ECECEC',
    width:'100%',
    borderRadius:15,
    display:'flex',
    flexDirection:'column',
    gap: 10,
    height:'auto'
  },
  attack: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    height:40,
    paddingHorizontal:10
  },
  buttonsContainer: {
    display:'flex',
    flexDirection:'row',
    gap:15
  },
  input: {
    borderBottomColor:'#ECECEC',
    borderBottomWidth:1,
    flex:7,
    padding:2
  },
  sendButton: {
    display:'flex',
    flex:3,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:6,
    backgroundColor:'#d0e1d3'
  }
})

export default Attacks