import { View, StyleSheet, StatusBar } from 'react-native'
import { useEffect } from 'react'
import Enemy_Carousel from './Enemy_Carousel'
import BattleViewModel from './ViewModel'
import Button_Panel from './Button_Panel'
import Animated, { useDerivedValue, useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated'
import Attack_Drawer from './Attack_Drawer'
import Weapon_Drawer from './Weapon_Drawer'
import Combat_Header from './Combat_Header'

const Battle = () => {

  const { enemies, character, showAttackDrawer, attacks, showWeaponDrawer, interval, round, showWeapons, showAttacks, sendAttack, handleEnemyChange, changeWeapon, fleeBattle } = BattleViewModel()

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
    startAnimation()
  },[])

  const startAnimation = () => {
    animation.value = withRepeat(
      withTiming(-1000, { duration: 80000 }),
      -1, // -1 indica repetir indefinidamente
      false // false indica que no debe hacer el bucle inverso
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.Image
        style={[styles.dice, animationStyle]}
        source={require('../../shared/images/ouroboros.png')}
      />
      <Enemy_Carousel enemyData={enemies} setCurrentObjective={(id, name) => handleEnemyChange(id, name)}/>
      {character !== null && (
        <>
        <Combat_Header round={round} timer={interval}/>
        <Button_Panel character ={character} pressAttack={() => showAttacks()} pressWeapon={() => showWeapons()} pressFlee={() => fleeBattle()}/>
        <Attack_Drawer 
        show={showAttackDrawer} 
        attacks={attacks} 
        close={() => showAttacks()} 
        selectAttack={sendAttack}/>
          
        <Weapon_Drawer 
        show={showWeaponDrawer} 
        close={() => showWeapons()} 
        currentWeapon={character.inventory_weapon_playable_character_weapon_idToinventory_weapon || null}
        weapons={character.inventory_weapon_inventory_weapon_id_userToplayable_character || null}
        changeWeapon={changeWeapon}
        />
        </>
      )}
      
    </View>
  )
}

export default Battle

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#2b2b2b'
    },
    dice:{
      position:'absolute',
      zIndex:0,
      top:150,
      right:-310,
      height:680,
      width:680,
      opacity:0.20,
    },
});
