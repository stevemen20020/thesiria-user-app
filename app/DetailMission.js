import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import ApiService from '../shared/services/apiService'
import Animated, { useDerivedValue, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

const DetailMission = () => {
  const [missionJournal, setMissionJournal] = useState(null)

  const mission_journal_id = useLocalSearchParams()
  const apiService = new ApiService

  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FF5733'];
  const text = ' completada';

  const animation = useSharedValue(0)
  const rotation = useDerivedValue(() => {
    return animation.value; // Simplemente tomar el valor directamente
  });
  
  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` } // Usar el valor directamente
      ]
    };
  });

  useEffect(() => {
    const fetchMission = async () => {
      const response = await apiService.getMissionJournalById(mission_journal_id.mission)
      setMissionJournal(response.result)
    }

    fetchMission()
    .catch( error => console.error(error))
  },[])

  useEffect(() => {
    startAnimation()
  },[missionJournal])

  const startAnimation = () => {
    animation.value = withTiming(-1000, {duration:80000})
  }

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.dice, animationStyle]}
        source={require('../shared/images/ouroboros.png')}
      />
      <View style={styles.mainContainer}>
        {missionJournal !== null ? (
          <>
            <Text style={styles.title}>{missionJournal.missions.name}</Text>
            <View
              style={styles.point}
            />
            
            <View style={styles.textContainer}>
              <Text style={styles.description}>Misión dada por: {missionJournal.missions.npc.name}</Text>
              <Text style={styles.description}>{missionJournal.missions.description}</Text>
            </View>
            <View
              style={styles.point}
            />
            {missionJournal.completed == 2 && (
              <>
              <View style={styles.misionCompletadaContainer}>
                <Text style={styles.description}>Misión 
                  {text.split('').map((letter, index) => (
                  <Text key={index} style={{color: colors[index % colors.length], fontWeight:'bold' }}>
                    {letter}
                  </Text>
                  ))}
                </Text>
              </View>
              <View style={styles.point}/>
              </>
            )}
            <View style={styles.textContainer}>
              <Text style={styles.description}>Fases:</Text>
              <FlatList
              style={styles.fases}
              data={missionJournal.missions.mission_fases}
              renderItem={({ item }) => (
                <>
                {item.active == 2 && (
                  <Text style={styles.fase}>{item.fase}.- {item.description}</Text>
                )}
                
                </>
              )}
              keyExtractor={item => item.id}
            />
            </View>
            
          </>
        ) : (
          <>
            <Text style={styles.title}>tas nulo</Text>
          </>
        )}
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#d0e1d3',
    height:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-end'
  },
  mainContainer:{
    height:'80%',
    width:'100%',
    backgroundColor:'white',
    padding:30,
    borderTopLeftRadius:45,
    borderTopRightRadius:45,
    zIndex:3,
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  dice:{
    position:'absolute',
    zIndex:2,
    top:30,
    right:-110,
    height:480,
    width:480,
    opacity:0.20,
  },
  title:{
    fontSize:25,
    fontWeight:"600",
    textAlign:'center'
  },
  point:{
    width:10,
    height:10,
    margin:15,
    backgroundColor:'#d0e1d3',
    borderRadius:10
  },
  description:{
    fontSize:14,
    textAlign:'justify',
    marginBottom:10
  },
  fases:{
    height:310,
  },
  fase:{
    fontSize:14,
    paddingLeft:20,
    marginBottom:10
  },
  textContainer:{
    width:'100%'
  },
  misionCompletadaContainer: {
    backgroundColor:'#d0e1d3',
    paddingTop:10,
    paddingBottom:3,
    paddingHorizontal:30,
    borderRadius:20
  },
})

export default DetailMission