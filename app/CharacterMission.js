import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { useState, useEffect } from 'react'
import ApiService from '../shared/services/apiService'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const CharacterMission = () => {
  const [myNPC, setMyNPC] = useState(null)
  const [refreshing, setRefreshing] = useState(false);

  const apiService = new ApiService

  useEffect(() => {
    const fetchCharacterRelationships = async () => {
      const response = await apiService.getNPCJournalByPlayerId(3)
      setMyNPC(response.result)
    }

    fetchCharacterRelationships()
    .catch( error => console.error(error))
  },[])

  const fetchCharacterRelationshipsOutside = async () => {
    const response = await apiService.getNPCJournalByPlayerId(3)
    setMyNPC(response.result)
  }

  const handleRefresh = async () => {
    setRefreshing(true);

    await fetchCharacterRelationshipsOutside()
    .catch( error => {
      console.error(error)
      setRefreshing(false);
    })

    setRefreshing(false);
  };

  const handleGoToMission = (npc) => {
    router.push({
      pathname: '/DetailCharacter',
      params:{npc:npc.id}
    })
  }

  const generateHearts = (heartNum) => {
    let hearts = []
    for(let heart = 0; heart < 10; heart++) {
      if(heart <= heartNum) hearts.push(<AntDesign name="heart" size={24} color="#e31809" key={heart}/>)
      else hearts.push(<AntDesign name="hearto" size={24} color="#e31809" key={heart}/>)
    }
    return hearts
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Mis relaciones</Text>
        {myNPC !== null && (
          <FlatList
            data={myNPC}
            renderItem={({ item }) => (
              <View style={styles.itemList}>
                <Image
                  style={styles.image}
                  source={{ uri: item.npc.image_reference}}
                />
                <View style={styles.heartContainer}>
                  {generateHearts(item.relationship)}
                </View>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => handleGoToMission(item)}>
                  <MaterialCommunityIcons name="cards-playing-heart-outline" size={38} color="black" />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title:{
    fontSize:34,
    fontWeight:'300',
  },
  container: {
    paddingHorizontal:15,
    display:'flex',
    flexDirection:'column',
    paddingTop:30
  },
  itemList:{
    height:80,
    display:'flex',
    flexDirection:'row',
    paddingTop:20,
    paddingBottom:20,
    borderBottomColor:'#d0e1d3',
    borderBottomWidth:2,
    alignItems:'center'
  },  
  info:{
    display:'flex',
    flexDirection:'column',
    flex:9
  },
  missionTitle:{
    fontSize:16,
    fontWeight:'600',
    paddingRight:20
  },
  missionDescription:{
    fontSize:14
  },
  image:{
    height:60,
    width:60
  },
  heartContainer: {
    flex:7,
    display:'flex',
    flexDirection:'row'
  }
});

export default CharacterMission