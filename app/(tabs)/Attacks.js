import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import ApiService from '../../shared/services/apiService'
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Attacks = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [myAttacks, setMyAttacks] = useState(null)
  const [favoriteAttacks, setFavoriteAttacks] = useState(null)

  const apiService = new ApiService

  useEffect(() => {
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

    fetchAttacks()
    .catch((error) => console.error(error))
  },[])
  
  return (
    <View style={styles.container}>
      <View style={styles.emptyTopContainer}/>
      {myAttacks !== null && (
        <>
        <TouchableOpacity style={styles.menuOpener} onPress={() => setMenuOpen(!menuOpen)}>
          <Text style={styles.menuOpenerText}>Mis ataques</Text>
          <AntDesign name={menuOpen ? 'caretdown' : 'caretright'} size={18} color="black" />
        </TouchableOpacity>


        <View style={styles.contentContainer}>
        {favoriteAttacks !== null && (
          <>
          <Text style={{marginBottom:5}}>Ataques favoritos: {favoriteAttacks.length}/10</Text>
          <ScrollView style={styles.attacksContainer}>
            {favoriteAttacks.map((attack, index) => (
              <View style={styles.attack} key={index}>
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
              </View>
            ))}
          </ScrollView>

          <Text style={{marginBottom:5, marginTop:15}}>Todos mis ataques </Text>
          <ScrollView style={styles.attacksContainer}>
            {myAttacks.map((attack, index) => (
              <View style={styles.attack} key={index}>
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
              </View>
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
    height:'75%',
    marginTop:15,
    padding:15
  },
  attacksContainer: {
    backgroundColor:'#ECECEC',
    width:'100%',
    padding:10,
    borderRadius:15,
    display:'flex',
    flexDirection:'column',
    gap: 10,
    maxHeight:180
  },
  attack: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    height:40
  }
})

export default Attacks