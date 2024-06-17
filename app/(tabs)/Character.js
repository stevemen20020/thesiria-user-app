
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, RefreshControl, Modal, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import ApiService from '../../shared/services/apiService'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import Tooltip from 'react-native-walkthrough-tooltip';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { AntDesign } from '@expo/vector-icons';

const Character = () => {
  const [activeCharacter, setActiveCharacter] = useState(null)
  const [allCharacters, setAllCharacters] = useState(null)
  const [devilFruitTooltip, setDevilFruitTooltip] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);
  const [moneyToGift, setMoneyToGift] = useState(0)

  const apiService = new ApiService

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await apiService.getPlayerById(3)
      setActiveCharacter(response.result)
    }

    const fetchCharacters = async () => {
      const response = await apiService.getAllPlayableCharacters()
      setAllCharacters(response.result)
    }

    fetchCharacter()
    .catch((error) => console.error(error))
    fetchCharacters()
    .catch((error) => console.error(error))
  },[])

  const handleRefresh = async () => {
    const response = await apiService.getPlayerById(3)
    setActiveCharacter(response.result)
  }

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

  const handleInventory = (mode) => {
    router.push({
      pathname: '/InventoryList',
      params: {
        mode:mode
      }
    })
  }

  const handleGiftMoney = async () => {
    const body = {
      money: parseFloat(moneyToGift),
      giftingPlayer: 3,
      giftedPlayer: parseInt(selectedValue)
    }
    const response = await apiService.giftMoney(body)

    const personaje = {
      ...activeCharacter,
      money:response.result.lostMoney
    }
    console.log(personaje.money, response)
    setActiveCharacter(personaje)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}>
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
            <View style={{display:'flex', flexDirection:'row', gap:2, alignItems:'center'}}>
              <Text>Oro: </Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.goldModal}>{activeCharacter.money.toLocaleString()}</Text>
              </TouchableOpacity>
            </View>
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
              <Text>Armadura equipada:</Text>
              <TouchableOpacity style={styles.basicContainer} onPress={() => handleDetail('armor')}>
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
              <Tooltip
                isVisible={devilFruitTooltip}
                content={<Text>{activeCharacter.devil_fruit.description}</Text>}
                placement="top"
                onClose={() => setDevilFruitTooltip(false)}
              >
                <TouchableOpacity style={styles.basicContainer} onPress={() => setDevilFruitTooltip(true)}>
                  <Text>{activeCharacter.devil_fruit.name}</Text>
                </TouchableOpacity>
              </Tooltip>
              </>
            )}
          </View>

          <Text style={{marginTop:15, marginBottom:15}}>Mis pertenencias:</Text>
          <View style={styles.buttonBag}>

            <TouchableOpacity style={styles.button} onPress={()=> {handleInventory('inventory')}}>
              <MaterialIcons name="inventory" size={74} color={activeCharacter.affinity.color} />
              <Text>Inventario</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=> {handleInventory('weapons')}}>
              <MaterialCommunityIcons name="sword" size={74} color={activeCharacter.affinity.color} />
              <Text>Armas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=> {handleInventory('armors')}}>
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

        {/* MODAL PARA PASAR DINERO */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        {allCharacters !== null && (<>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Regalar dinero</Text>
              <Text style={styles.modalSubtitle}>¿Por qué harías eso?</Text>

              <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                mode='dropdown'
              >
                <Picker.Item label="Selecciona un jugador" value={-1} style={styles.pickerItem}/>
                {allCharacters.map((character, index) => (
                  <Picker.Item key={index} label={character.name} value={character.id} style={styles.pickerItem}/>
                ))}
              </Picker>
              <Slider
                style={styles.moneySlider}
                minimumValue={0}
                maximumValue={parseFloat(activeCharacter.money)}
                value={moneyToGift}
                onValueChange={(value) => setMoneyToGift(value)}
              />
              <Text style={styles.modalSubtitle}>{moneyToGift.toLocaleString()}</Text>
              <TouchableOpacity style={styles.giftButton} onPress={() => handleGiftMoney()} disabled={selectedValue <= 0 || moneyToGift === 0}>
                <Text>Regalar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            </View>
        </>)}
        </Modal>   
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
    },
    goldModal:{
      textDecorationStyle:'solid',
      textDecorationLine:'underline',
      color:'#2093f3'
    },

    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 15,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height:240
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalTitle: {
      textAlign: 'center',
      fontWeight:'600'
    },
    modalSubtitle: {
      textAlign: 'center',
      fontWeight:'600',
      fontSize:10
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
    },
    picker:{
      width:'90%',
      height:20,
    },
    pickerItem:{
      fontSize:12
    },
    moneySlider:{
      width:'100%',
      height:30
    },
    giftButton:{
      backgroundColor: '#d0e1d3',
      padding:10,
      margin:10,
      borderRadius:6,
      width:'70%',
      alignItems:'center'
    }
  })

export default Character