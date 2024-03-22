import React from 'react'
import { Tabs } from 'expo-router'
import { Entypo } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const screenOptions= {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      position: 'absolute',
      bottom: 25, // Ajusta la distancia de las tabs desde el fondo
      right: 20,
      left: 20,
      elevation: 0,
      height: 60,
      background: '#fff',
      flexDirection: 'row', 
      borderRadius:10,
      paddingBottom:0,
    },
}

const CustomButton = ({ onPress }) => (
  <TouchableOpacity onPress={() => console.log('modal')} style={styles.customButton}>
    <FontAwesome5 name="dice-d20" size={34} color="black" />
  </TouchableOpacity>
);

const _layout = () => {
  return (
    <>
      <Tabs screenOptions={screenOptions}>
        <Tabs.Screen name='Map'
        options={{
          tabBarIcon: ({focused}) => {
            return (
            <View style={{alignItems:'center', justifyContent:'center'}}>
              <Feather name="map" size={24} color={focused ? '#16247d' : '#111'} />
            </View>
            )
          }
        }}
        />


        <Tabs.Screen name='Character'
        options={{
          tabBarIcon: ({focused}) => {
            return (
            <View style={{alignItems:'center', justifyContent:'center', marginRight:30}}>
              <AntDesign name="user" size={24} color={focused ? '#16247d' : '#111'} />
            </View>
            )
          }
        }}
        />


        <Tabs.Screen name='Journal'
        options={{
          tabBarIcon: ({focused}) => {
            return (
            <View style={{alignItems:'center', justifyContent:'center', marginLeft:30}}>
              <Entypo name="heart-outlined" size={24} color={focused ? '#16247d' : '#111'} />
            </View>
            )
          }
        }}
        />


        <Tabs.Screen name='Attacks'
        options={{
          tabBarIcon: ({focused}) => {
            return (
            <View style={{alignItems:'center', justifyContent:'center'}}>
              <FontAwesome name="magic" size={24} color={focused ? '#16247d' : '#111'} />
            </View>
            )
          }
        }}
        />
      </Tabs>
      <CustomButton/>
    </>
  )
}

const styles = StyleSheet.create({
  customButton: {
      position: 'absolute',
      bottom: 50,
      alignSelf: 'center',
      backgroundColor: '#d0e1d3',
      width: 65,
      height: 65,
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
  },
});

export default _layout