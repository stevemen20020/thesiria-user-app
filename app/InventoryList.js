import { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TextInput, Image } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import ApiService from '../shared/services/apiService'
import { router } from 'expo-router';

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

    fetchCharacter()
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
                <MenuOption onSelect={() => handleGoToDetail('weapon', item)} text='Pasar a...' />
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
  }
})

export default InventoryList