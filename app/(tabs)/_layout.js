import { useState } from 'react';
import { Tabs } from 'expo-router'
import { Entypo } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet, Modal, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

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
  const [selectedValue, setSelectedValue] = useState('');
  const [shuffleInterval, setShuffleInterval] = useState(null);

  const generateNumber = () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    setRolledNumber(randomNumber);
  };

  const startShuffle = () => {
    const interval = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 20) + 1;
      setRolledNumber(randomNumber);
    }, 100); // Adjust the interval for speed
    setShuffleInterval(interval);
  };

  const stopShuffle = () => {
    clearInterval(shuffleInterval);
    setShuffleInterval(null);
  };
  
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
            <View style={styles.diceContainer}>
              <FontAwesome5 name="dice-d20" size={150} color="#a0a474" style={styles.dice}/>
              <Text style={styles.roll}>{rolledNumber}</Text>
            </View>
            <Picker
              selectedValue={selectedValue}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              mode='dropdown'
            >
              <Picker.Item label="Selecciona una habilidad" value="-1" style={styles.pickerItem}/>
              <Picker.Item label="Fuerza" value="1" style={styles.pickerItem}/>
              <Picker.Item label="Destreza" value="2" style={styles.pickerItem}/>
              <Picker.Item label="Defensa" value="3" style={styles.pickerItem}/>
              <Picker.Item label="Puntería" value="4" style={styles.pickerItem}/>
              <Picker.Item label="Visión" value="5" style={styles.pickerItem}/>
              <Picker.Item label="Velocidad" value="6" style={styles.pickerItem}/>
              <Picker.Item label="Manitas" value="7" style={styles.pickerItem}/>
              <Picker.Item label="Agilidad" value="8" style={styles.pickerItem}/>
              <Picker.Item label="Carisma" value="9" style={styles.pickerItem}/>
              <Picker.Item label="Inteligencia" value="10" style={styles.pickerItem}/>
              <Picker.Item label="Sabiduría" value="11" style={styles.pickerItem}/>
            </Picker>
            <TouchableOpacity style={styles.buttonTirar} onPress={generateNumber} onLongPress={startShuffle} onPressOut={stopShuffle}>
              <Text style={styles.textTirar}>T I R A R</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <AntDesign name="close" size={24} color="black" />
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
    display:'flex',
    flexDirection:'column',
    width:'80%',
    height:450
  },
  dice:{
    position:'absolute',
    top:30
  },
  roll: {
    fontWeight:'700',
    position:'absolute',
    top:94,
    fontSize:25,
    color:'white',
    paddingLeft:1
  },
  closeButton: {

  },
  picker:{
    width:'90%',
    height:20,
    
  },
  pickerItem:{
    fontSize:12
  },
  buttonTirar: {
    width:'85%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#a0a474',
    padding:15,
    borderRadius:10
  },
  textTirar:{
    fontWeight:'800',
    color:'white'
  },
  diceContainer:{
    position:'relative',
    width:'100%',
    height:200,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  }
});

export default _layout