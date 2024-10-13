import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import AntDesign from '@expo/vector-icons/AntDesign';

const Weapon_Drawer = (props) => {
  const translateY = useSharedValue(300);

  useEffect(() => {
    translateY.value = withTiming(props.show ? 0 : 300, { duration: 200 });
  }, [props.show]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }]
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity onPress={props.close}>
        <AntDesign name="close" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.mainContainer}>

        <View style={styles.active_weapon}>
          <Text style={{flex:4}}>{props.currentWeapon.weapon.name}</Text>
          <Text style={{flex:1}}>{props.currentWeapon.weapon.durability}</Text>
          <Text style={{flex:1}}>{props.currentWeapon.weapon.chipping}</Text>
          <Image source={{uri: props.currentWeapon.weapon.image !== null ? props.currentWeapon.weapon.image : null}} style={styles.weaponImage}/>
        </View>

        <FlatList
        data={props.weapons}
        style={styles.weaponsInReserve}
        renderItem={({item}) => 

        <TouchableOpacity style={styles.active_weapon} onPress={() => props.changeWeapon(item.id_weapon)}>
          <Text style={{flex:4}}>{item.weapon.name}</Text>
          <Text style={{flex:1}}>{item.weapon.durability}</Text>
          <Text style={{flex:1}}>{item.weapon.chipping}</Text>
          <Image source={{uri: item.weapon.image !== null ? item.weapon.image : null}} style={styles.weaponImage}/>
        </TouchableOpacity>
        }
        />
      </View>
      
    </Animated.View>
  )
}

export default Weapon_Drawer

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 300,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    flexDirection: 'row',
    gap: 10,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#12334a'
  },
  list: {
    flex:1
  },
  reportItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    display:'flex',
    flexDirection:'row',
    gap:10
  },
  reportText: {
    fontSize: 13,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: 'white',
    borderBottomWidth:1,
    borderBottomColor: 'white'
  },
  mainContainer:{
    display:'flex',
    flex:1,
    flexDirection:'column',
    gap:10
  },
  active_weapon:{
    height:40,
    backgroundColor:'white',
    justifyContent:'center',
    padding:5,
    borderRadius:5,
    display:'flex',
    flexDirection:'row'
  },
  weaponsInReserve:{
    backgroundColor:'white',
    borderRadius:5,
  },
  weaponImage:{
    height:30,
    width:30,
    flex:1,
    resizeMode:'contain'
  },
});