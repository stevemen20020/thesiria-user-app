import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import ApiService from '../shared/services/apiService'
import Animated, { useDerivedValue, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { AntDesign } from '@expo/vector-icons';

const DetailCharacter = () => {
  const [npcJournal, setNpcJournal] = useState(null)
  const [specialColor, setSpecialColor] = useState('#d0e1d3')

  const npc_journal_id = useLocalSearchParams()
  const apiService = new ApiService

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
      const response = await apiService.getNPCJournalById(npc_journal_id.npc)
      console.log(response.result)
      setNpcJournal(response.result)
      setSpecialColor(response.result.npc.affinity.color)
    }

    fetchMission()
    .catch( error => console.error(error))
  },[])

  useEffect(() => {
    startAnimation()
  },[npcJournal])

  const generateHearts = (heartNum) => {
    let hearts = []
    for(let heart = 0; heart < 10; heart++) {
      if(heart <= heartNum) hearts.push(<AntDesign name="heart" size={24} color={specialColor} key={heart}/>)
      else hearts.push(<AntDesign name="hearto" size={24} color={specialColor} key={heart}/>)
    }
    return hearts
  }

  const startAnimation = () => {
    animation.value = withTiming(-1000, {duration:80000})
  }

  return (
    <View style={[styles.container, { backgroundColor:specialColor}]}>
      <Animated.Image
        style={[styles.dice, animationStyle]}
        source={require('../shared/images/ouroboros.png')}
      />
      <ScrollView style={styles.scroll}>
      <View style={styles.mainContainer}>
        {npcJournal !== null ? (
          <>
            <Text style={[styles.title, {backgroundColor:npcJournal.npc.affinity.color}]}>{npcJournal.npc.name}</Text>
            <Image
              style={styles.image}
              source={{ uri: npcJournal.npc.image_reference}}
            />
            <View style={styles.dataContainer}>
              <View>
                <Text style={[{color:npcJournal.npc.affinity.color}, styles.datos]}>Raza</Text>
                <Text>{npcJournal.npc.races.race}</Text>
              </View>
              <View style={styles.verticalSeparator}/>
              <View>
              <Text style={[{color:npcJournal.npc.affinity.color}, styles.datos]}>Afinidad</Text>
                <Text>{npcJournal.npc.affinity.name}</Text>
              </View>
              <View style={styles.verticalSeparator}/>
              <View>
              <Text style={[{color:npcJournal.npc.affinity.color}, styles.datos]}>Estatus</Text>
                {npcJournal.npc.chronicler_status === 1 ? (
                  <Text>Cronista</Text>
                ) : (
                  <Text>No Cronista</Text>
                )}
                
              </View>
            </View>
            <View style={{display:'flex', flexDirection:'row', marginVertical:10, gap:5}}>
              {generateHearts(npcJournal.relationship)}
            </View>
            <Text style={[{color:npcJournal.npc.affinity.color}, styles.datos]}>Biografía:</Text>
            <Text style={styles.description}>{npcJournal.npc.biography}</Text>
            { npcJournal.npc.weapon !== null && (
              <>
              <Text style={[{color:npcJournal.npc.affinity.color}, styles.datos]}>Arma:</Text>
              <Image
                style={[styles.image, {marginBottom:20}]}
                source={{ uri: npcJournal.npc.weapon.image}}
              />
              <Text style={[styles.title, {backgroundColor:npcJournal.npc.affinity.color, marginBottom:20}]}>{npcJournal.npc.weapon.name}</Text>

              <View style={styles.dataContainer}>
                <View>
                  <Text style={[{color:npcJournal.npc.affinity.color}, styles.datos]}>Rareza</Text>
                  {npcJournal.npc.weapon.rarity === 1 && (<Text>Común</Text>)}
                  {npcJournal.npc.weapon.rarity === 2 && (<Text>Poco común</Text>)}
                  {npcJournal.npc.weapon.rarity === 3 && (<Text>Raro</Text>)}
                  {npcJournal.npc.weapon.rarity === 4 && (<Text>Épico</Text>)}
                  {npcJournal.npc.weapon.rarity === 5 && (<Text>Legendario</Text>)}
                </View>
                <View style={styles.verticalSeparator}/>
                <View>
                  <Text style={[{color:npcJournal.npc.affinity.color}, styles.datos]}>Elemento</Text>
                  <Text>{npcJournal.npc.weapon.elements.name}</Text>
                </View>
                <View style={styles.verticalSeparator}/>
                <View>
                  <Text style={[{color:npcJournal.npc.affinity.color}, styles.datos]}>Objeto de mejora</Text>
                  <Text>{npcJournal.npc.weapon.objects.name}</Text>
                </View>
              </View>
              
              <Text style={[{color:npcJournal.npc.affinity.color}, styles.datos]}>Descripción:</Text>
              <Text style={[styles.description, {fontStyle:'italic'}]}>"{npcJournal.npc.weapon.description}"</Text>

              </>
            )}
            
          </>
        ) : (
          <>
            <Text style={styles.title}>tas nulo</Text>
          </>
        )}
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    height:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-end',
    position:'relative'
  },
  mainContainer:{
    height:'100%',
    width:'100%',
    backgroundColor:'white',
    padding:30,
    borderTopLeftRadius:45,
    borderTopRightRadius:45,
    zIndex:3,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    overflow:'scroll'
  },
  scroll:{
    height:'80%',
    width:'100%',
    backgroundColor:'white',
    borderTopLeftRadius:45,
    borderTopRightRadius:45,
    zIndex:2,
    position:'absolute',
    bottom:0
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
    textAlign:'center',
    padding:5,
    paddingHorizontal:15,
    borderRadius:20,
    overflow:'hidden',
    color:'white'
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
  image: {
    height:250,
    width:250
  },
  dataContainer:{
    display:'flex',
    flexDirection:'row',
    marginBottom:20,
    gap:20
  },
  verticalSeparator: {
    height:'100%',
    width:1,
    backgroundColor:'black'
  },
  datos: {
    textAlign:'center',
    marginBottom:2,
    paddingBottom:2,
    borderBottomColor:"red",
    borderBottomWidth:2
  }
})

export default DetailCharacter