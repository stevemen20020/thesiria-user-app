import { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TextInput, Image, Modal, TouchableOpacity } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import ApiService from '../shared/services/apiService'
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { AntDesign } from '@expo/vector-icons';

const InventoryList = () => {
  const [inventory, setInventory] = useState([])
  const [filteredInventory, setFilteredInventory] = useState([])
  const [weapons, setWeapons] = useState([])
  const [filteredWeapons, setFilteredWeapons] = useState([])
  const [armors, setArmors] = useState([])
  const [filteredArmors, setFilteredArmors] = useState([])
  const [activeCharacter, setActiveCharacter] = useState(null)
  const [inventoryInput, setInventoryInput] = useState('')
  const [weaponInput, setWeaponInput] = useState('')
  const [armorInput, setArmorInput] = useState('')
  const [modalInventoryVisible, setModalInventoryVisible] = useState(false);
  const [modalWeaponsVisible, setModalWeaponsVisible] = useState(false);
  const [modalArmorsVisible, setModalArmorsVisible] = useState(false);
  const [allCharacters, setAllCharacters] = useState(null)
  const [selectedCharacterInventory, setSelectedCharacterInventory] = useState(null)
  const [selectedCharacterWeapon, setSelectedCharacterWeapon] = useState(null)
  const [selectedCharacterArmor, setSelectedCharacterArmor] = useState(null)
  const [itemAmountToGift, setItemAmountToGift] = useState(0)
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedWeapon, setSelectedWeapon] = useState(null)
  const [selectedArmor, setSelectedArmor] = useState(null)

  const { mode } = useLocalSearchParams()
  const apiService = new ApiService

  useEffect(() => {
    if (!mode) return; // Asegúrate de que `mode` esté definido

    const fetchInventory = async () => {
      const response = await apiService.getInventory(3);
      setInventory(response.result);
      setFilteredInventory(response.result)
    };
    const fetchWeapons = async () => {
      const response = await apiService.getWeapons(3);
      setWeapons(response.result);
      setFilteredWeapons(response.result)
    };
    const fetchArmors = async () => {
      const response = await apiService.getArmors(3);
      setArmors(response.result);
      setFilteredArmors(response.result)
    };

    if (mode === 'inventory') fetchInventory().catch((error) => console.error(error));
    if (mode === 'weapons') fetchWeapons().catch((error) => console.error(error));
    if (mode === 'armors') fetchArmors().catch((error) => console.error(error));

    const fetchCharacter = async () => {
      const response = await apiService.getPlayerById(3)
      setActiveCharacter(response.result)
    }

    const fetchAllCharacters = async () => {
      const response = await apiService.getAllPlayableCharacters()
      setAllCharacters(response.result)
    }

    fetchCharacter()
    .catch((error) => console.error(error))
    fetchAllCharacters()
    .catch((error) => console.error(error))

  }, [mode]); 

  const handleGoToDetail = (mode, inventory) => {
    let sendableCharacter = {}
    if(mode === 'armor') {
      sendableCharacter = {
        ...activeCharacter,
        inventory_armor_playable_character_armor_idToinventory_armor: inventory
      }
    } else if (mode === 'weapon') {
      sendableCharacter = {
        ...activeCharacter,
        inventory_weapon_playable_character_weapon_idToinventory_weapon: inventory
      }
    }
    //

    router.push({
      pathname: '/DetailAsset',
      params:{
        character: JSON.stringify(sendableCharacter),
        mode:mode
      }
    })
  }

  const handleVerifyEquipedWeapon = (weapon) => {
    if(weapon.id === activeCharacter.weapon_id){
      return true
    } else {
      return false
    }
  }

  const handleVerifyEquipedArmor = (armor) => {
    if(armor.id === activeCharacter.armor_id) {
      return true
    } else {
      return false
    }
  }

  const handleUse = async (inventory) => {
    const body = {
      quantity: inventory.quantity - 1
    }
    await apiService.putInventory(body, inventory.id);
    const response = await apiService.getInventory(3);
    setInventory(response.result);
    setFilteredInventory(response.result)
  }

  const handleEquip = async (id_weapon_inventory) => {
    const body = {
      weapon_id: id_weapon_inventory
    }
    await apiService.putPlayableCharacter(body, activeCharacter.id);
    const response = await apiService.getPlayerById(3)
    setActiveCharacter(response.result)
  }

  const handleEquipArmor = async (id_armor_inventory) => {
    const body = {
      armor_id: id_armor_inventory
    }
    await apiService.putPlayableCharacter(body, activeCharacter.id);
    const response = await apiService.getPlayerById(3)
    setActiveCharacter(response.result)
  }

  const onChangeWeapon = (input) => {
    setWeaponInput(input);
    if (input === '') {
      setFilteredWeapons(weapons);
    } else {
      const filtered = weapons.filter((weapon) =>
        weapon.weapon.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredWeapons(filtered);
    }
  };

  const onChangeArmor = (input) => {
    setArmorInput(input);
    if (input === '') {
      setFilteredArmors(armors);
    } else {
      const filtered = armors.filter((armor) =>
        armor.armor.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredArmors(filtered);
    }
  };

  const onChangeInventory = (input) => {
    setInventoryInput(input);
    if (input === '') {
      setFilteredInventory(inventory);
    } else {
      const filtered = inventory.filter((inventory) =>
        inventory.objects.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredInventory(filtered);
    }
  };

  const handleGiftItem = async () => {
    const body = {
      id_character: selectedItem.id_playable_character,
      id_receiving_character: selectedCharacterInventory,
      id_object: selectedItem.id_object,
      amount: parseInt(itemAmountToGift)
    }

    const response = await apiService.giftItem(body)
    if(response.message === "Success"){
      setModalInventoryVisible(false)
      const response = await apiService.getInventory(3);
      setInventory(response.result);
      setFilteredInventory(response.result)
    }
  }

  const handleGiftWeapon = async () => {
    const body = {
      id_player: selectedWeapon.id_user,
      id_receiving_player: selectedCharacterWeapon,
      id_weapon: selectedWeapon.id_weapon,
    }
    const response = await apiService.giftWeapon(body)
    if(response.message === "Success"){
      setModalWeaponsVisible(false)
      const response = await apiService.getWeapons(3);
      setWeapons(response.result);
      setFilteredWeapons(response.result)
    }
  }

  const handleGiftArmor = async () => {
    const body = {
      id_player: selectedArmor.id_user,
      id_receiving_player: selectedCharacterArmor,
      id_armor: selectedArmor.id_armor,
    }

    console.log(body)
    const response = await apiService.giftArmor(body)
    console.log(response)
    if(response.message === "Success"){
      setModalArmorsVisible(false)
      const response = await apiService.getArmors(3);
      setArmors(response.result);
      setFilteredArmors(response.result)
    }
  }

  return (
    <View style={styles.container}>
      {activeCharacter !== null && (
      <>
      <View style={styles.emptyContainer}></View>
      <Text style={styles.title}>{(mode === 'inventory' ? 'Inventario' : mode === 'weapons' ? 'Armas' : 'Armaduras').toUpperCase()}</Text>
      {mode === 'inventory' && (
        <>
        <TextInput
          style={styles.input}
          onChangeText={onChangeInventory}
          value={inventoryInput}
          placeholder='Busca un objeto'
        />
        <FlatList
          data={filteredInventory}
          style={styles.list}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          renderItem={({item}) => 
            <>
            <Menu>
              <MenuTrigger style={styles.inventoryContainer}>
                <Text style={{flex:9}}>{item.objects.name}</Text> 
                <Text>{item.quantity}</Text>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => handleGoToDetail('weapon', item)} text='Detalle' />
                <MenuOption onSelect={() => {setModalInventoryVisible(true); setSelectedItem(item)}} text='Regalar' />
                <MenuOption onSelect={() => handleUse(item)} text='Usar' />
              </MenuOptions>
            </Menu>
            </>
          }
          keyExtractor={item => item.id}
        />
        </>
      )}
      {mode === 'weapons' && (
        <>
        <TextInput
          style={styles.input}
          onChangeText={onChangeWeapon}
          value={weaponInput}
          placeholder='Busca un arma'
        />
        <FlatList
          data={filteredWeapons}
          style={styles.list}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          renderItem={({item}) => 
            <>
            <Menu>
              <MenuTrigger style={styles.inventoryContainer}>
                <Text style={{flex:7}}>
                  {item.weapon.name}
                  {handleVerifyEquipedWeapon(item) && ' (equipado)'}
                </Text> 
                <Image style={[styles.image, {flex:3}]} source={{uri: item.weapon.image}}/>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => handleGoToDetail('weapon', item)} text='Detalle' />
                <MenuOption onSelect={() => {setModalWeaponsVisible(true); setSelectedWeapon(item)}} text='Pasar a...' />
                {handleVerifyEquipedWeapon(item) ? (
                  <MenuOption onSelect={() => handleEquip(null)} text='Desequipar' />
                ) : (
                  <MenuOption onSelect={() => handleEquip(item.id)} text='Equipar' />
                )}
              </MenuOptions>
            </Menu>
            </>
          }
          keyExtractor={item => item.id}
        />
        </>
      )}
      {mode === 'armors' && (
        <>
        <TextInput
        style={styles.input}
        onChangeText={onChangeArmor}
        value={armorInput}
        placeholder='Busca una armadura'
        />
        <FlatList
          data={filteredArmors}
          style={styles.list}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          renderItem={({item}) => 
            <Menu>
              <MenuTrigger style={styles.inventoryContainer}>
                <Text style={{flex:7}}>
                  {item.armor.name}
                  {handleVerifyEquipedArmor(item) && ' (equipado)'}
                </Text> 
                <Image style={[styles.image, {flex:3}]} source={{uri: item.armor.image}}/>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => handleGoToDetail('armor', item)} text='Detalle' />
                <MenuOption onSelect={() => {setModalArmorsVisible(true); setSelectedArmor(item)}} text='Pasar a...' />
                {handleVerifyEquipedArmor(item) ? (
                  <MenuOption onSelect={() => handleEquipArmor(null)} text='Desequipar' />
                ) : (
                  <MenuOption onSelect={() => handleEquipArmor(item.id)} text='Equipar' />
                )}
              </MenuOptions>
            </Menu>
          }
          keyExtractor={item => item.id}
        />
        </>
      )}

      {/* MODALES */}

      {/* MODAL PARA PASAR OBJETOS */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalInventoryVisible}
        onRequestClose={() => {
          setModalInventoryVisible(!modalInventoryVisible);
        }}>
        {allCharacters !== null && selectedItem !== null && (
          <>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Transferir {selectedItem.objects.name}</Text>
                <Text style={styles.modalSubtitle}>¿Por qué harías eso?</Text>

                <Picker
                  selectedValue={selectedCharacterInventory}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => setSelectedCharacterInventory(itemValue)}
                  mode='dropdown'
                >
                  <Picker.Item label="Selecciona un jugador" value={-1} style={styles.pickerItem} />
                  {allCharacters.map((character, index) => (
                    <Picker.Item key={index} label={character.name} value={character.id} style={styles.pickerItem} />
                  ))}
                </Picker>
                <Slider
                  style={styles.moneySlider}
                  minimumValue={0}
                  maximumValue={parseFloat(selectedItem.quantity)}
                  value={itemAmountToGift}
                  onValueChange={(value) => setItemAmountToGift(value)}
                  step={1}  // Esta propiedad asegura que el Slider solo seleccione números enteros
                />
                <Text style={styles.modalSubtitle}>{itemAmountToGift.toLocaleString()}</Text>
                <TouchableOpacity style={styles.giftButton} onPress={() => handleGiftItem()} disabled={itemAmountToGift <= 0 || itemAmountToGift === 0}>
                  <Text>Transferir</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalInventoryVisible(false)} style={styles.closeButton}>
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Modal>

      {/* MODAL PARA PASAR ARMAS */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalWeaponsVisible}
        onRequestClose={() => {
          setModalWeaponsVisible(!modalWeaponsVisible);
        }}>
        {allCharacters !== null && selectedWeapon !== null && (
          <>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Transferir {selectedWeapon.weapon.name}</Text>
                <Text style={styles.modalSubtitle}>¿Por qué harías eso?</Text>

                <Picker
                  selectedValue={selectedCharacterWeapon}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => setSelectedCharacterWeapon(itemValue)}
                  mode='dropdown'
                >
                  <Picker.Item label="Selecciona un jugador" value={-1} style={styles.pickerItem} />
                  {allCharacters.map((character, index) => (
                    <Picker.Item key={index} label={character.name} value={character.id} style={styles.pickerItem} />
                  ))}
                </Picker>
                <TouchableOpacity style={styles.giftButton} onPress={() => handleGiftWeapon()} disabled={selectedCharacterWeapon <= 0 || selectedCharacterWeapon === 0}>
                  <Text>Transferir</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalWeaponsVisible(false)} style={styles.closeButton}>
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Modal>

      {/* MODAL PARA PASAR ARMADURAS */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalArmorsVisible}
        onRequestClose={() => {
          setModalArmorsVisible(!modalArmorsVisible);
        }}>
        {allCharacters !== null && selectedArmor !== null && (
          <>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Transferir {selectedArmor.armor.name}</Text>
                <Text style={styles.modalSubtitle}>¿Por qué harías eso?</Text>

                <Picker
                  selectedValue={selectedCharacterArmor}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => setSelectedCharacterArmor(itemValue)}
                  mode='dropdown'
                >
                  <Picker.Item label="Selecciona un jugador" value={-1} style={styles.pickerItem} />
                  {allCharacters.map((character, index) => (
                    <Picker.Item key={index} label={character.name} value={character.id} style={styles.pickerItem} />
                  ))}
                </Picker>
                <TouchableOpacity style={styles.giftButton} onPress={() => handleGiftArmor()} disabled={selectedCharacterArmor <= 0 || selectedCharacterArmor === 0}>
                  <Text>Transferir</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalArmorsVisible(false)} style={styles.closeButton}>
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Modal>
  
      </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    height:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    padding:10
  },
  emptyContainer:{
    height:60,
    width:'100%',
  },
  title: {
    fontSize: 20,
    letterSpacing:10,
    width:'100%',
    textAlign:'center',
    marginBottom:20
  },
  list:{
    width:'100%'
  },
  inventoryContainer:{
    width:'100%',
    padding:15,
    backgroundColor:'white',
    height:60,
    display:'flex',
    flexDirection:'row',
    borderRadius:10,
    alignItems:'center'
  },
  image:{
    height:40,
    width:40,
    resizeMode:'contain'
  },
  input:{
    backgroundColor:'white',
    height:40,
    width:'100%',
    borderRadius:10,
    marginBottom:30,
    paddingLeft:10,
    paddingRight:10
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
})

export default InventoryList