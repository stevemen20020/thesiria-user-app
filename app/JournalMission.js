import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { useState, useEffect } from 'react'
import ApiService from '../shared/services/apiService'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const JournalMission = () => {
  const [myMissions, setMyMissions] = useState(null)
  const [refreshing, setRefreshing] = useState(false);

  const apiService = new ApiService

  useEffect(() => {
    const fetchMissions = async () => {
      const response = await apiService.getMissionJournalByPlayerId(3)
      setMyMissions(response.result)
    }

    fetchMissions()
    .catch( error => console.error(error))
  },[])

  const fetchMissionsOutside = async () => {
    const response = await apiService.getMissionJournalByPlayerId(3)
    setMyMissions(response.result)
  }

  const handleRefresh = async () => {
    setRefreshing(true);

    await fetchMissionsOutside()
    .catch( error => {
      console.error(error)
      setRefreshing(false);
    })

    setRefreshing(false);
  };

  const handleGoToMission = (mission) => {
    router.push({
      pathname: '/DetailMission',
      params:{mission:mission.id}
    })
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Mis misiones</Text>
        {myMissions !== null && (
          <FlatList
            data={myMissions}
            renderItem={({ item }) => (
              <View style={styles.itemList}>
                <Image
                  style={styles.image}
                  source={require('../shared/images/kamisato_ayaka_pj_rez.png')}
                />
                <View style={styles.info}>
                  <Text style={styles.missionTitle} numberOfLines={1}>{item.missions.name}</Text>
                  <Text style={styles.missionDescription} numberOfLines={2}>{item.missions.description}</Text>
                </View>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => handleGoToMission(item)}>
                  <MaterialCommunityIcons name="book-search-outline" size={30} color="black" />
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
  );
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
  }
});

export default JournalMission