import { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, ItemSeparatorComponent, Image } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import ApiService from '../shared/services/apiService'
import { router } from 'expo-router';

const InventoryList = () => {
  const [inventory, setInventory] = useState([])
  const [weapons, setWeapons] = useState([])
  const [armors, setArmors] = useState([])
  const [activeCharacter, setActiveCharacter] = useState(null)

  const { mode } = useLocalSearchParams()
  const apiService = new ApiService

  useEffect(() => {
    if (!mode) return; // Asegúrate de que `mode` esté definido

    const fetchInventory = async () => {
      const response = await apiService.getInventory(3);
      setInventory(response.result);
    };
    const fetchWeapons = async () => {
      const response = await apiService.getWeapons(3);
      console.log(response.result)
      setWeapons(response.result);
    };
    const fetchArmors = async () => {
      const response = await apiService.getArmors(3);
      setArmors(response.result);
    };

    if (mode === 'inventory') fetchInventory().catch((error) => console.error(error));
    if (mode === 'weapons') fetchWeapons().catch((error) => console.error(error));
    if (mode === 'armors') fetchArmors().catch((error) => console.error(error));

    const fetchCharacter = async () => {
      const response = await apiService.getPlayerById(3)
      console.log(response.result)
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

  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer}></View>
      <Text style={styles.title}>{(mode === 'inventory' ? 'Inventario' : mode === 'weapons' ? 'Armas' : 'Armaduras').toUpperCase()}</Text>
      {mode === 'inventory' && (
        <FlatList
          data={inventory}
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
                
                <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
              </MenuOptions>
            </Menu>
            </>
          }
          keyExtractor={item => item.id}
        />
      )}
      {mode === 'weapons' && (
        <FlatList
          data={weapons}
          style={styles.list}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          renderItem={({item}) => 
            <>
            <Menu>
              <MenuTrigger style={styles.inventoryContainer}>
                <Text style={{flex:7}}>{item.weapon.name}</Text> 
                <Image style={[styles.image, {flex:3}]} source={{uri: item.weapon.image}}/>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => handleGoToDetail('weapon', item)} text='Detalle' />
              </MenuOptions>
            </Menu>
            </>
          }
          keyExtractor={item => item.id}
        />
      )}
      {mode === 'armors' && (
        <FlatList
          data={armors}
          style={styles.list}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          renderItem={({item}) => 
            <Menu>
              <MenuTrigger style={styles.inventoryContainer}>
                <Text style={{flex:7}}>{item.armor.name}</Text> 
                <Image style={[styles.image, {flex:3}]} source={{uri: item.armor.image}}/>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => handleGoToDetail('armor', item)} text='Detalle' />
              </MenuOptions>
            </Menu>
          }
          keyExtractor={item => item.id}
        />
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
  }
})

export default InventoryList