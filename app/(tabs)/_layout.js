import { useState } from 'react';
import { Tabs } from 'expo-router'
import { Entypo } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet, Modal, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

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
  <TouchableOpacity onPress={onPress} style={styles.customButton}>
    <FontAwesome5 name="dice-d20" size={34} color="black" />
  </TouchableOpacity>
);

const _layout = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rolledNumber, setRolledNumber] = useState(20)
  const [selectedStat, setSelectedStat] = useState(null)
  
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
      <CustomButton onPress={() => setModalVisible(true)}/>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FontAwesome5 name="dice-d20" size={190} color="#a0a474" style={styles.dice}/>
            <Text style={styles.roll}>{rolledNumber}</Text>
            <View style={styles.picker}>
              <Picker
              selectedValue={selectedStat}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedStat(itemValue)
              }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </View>
            

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text>Cerrar modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position:'relative',
    width:'80%',
    height:'40%'
  },
  dice:{
    position:'absolute',
    top:30
  },
  roll: {
    fontWeight:'700',
    position:'absolute',
    top:112,
    fontSize:25,
    color:'white',
    paddingLeft:1
  },
  closeButton: {
    position:'absolute',
    bottom:10
  },
  picker :{
    position:'absolute',
    bottom:55,
    backgroundColor:'red',
    height:20,
    width:20
  }
});

export default _layout