import { SectionList, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Attack_Drawer = (props) => {
  const translateY = useSharedValue(300); // Valor inicial fuera de la vista

  // Actualizamos la posición basada en el valor de show
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
      
      <SectionList
        style={styles.list}
        sections={props.attacks}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.reportItem} onPress={() => props.selectAttack(item.id, item.attack_type)}>
            {item.weapon_type === 1 && (
              <FontAwesome6  name="hand-fist" size={17} color={'black'} />
            )}
            {item.weapon_type === 2 && (
              <MaterialCommunityIcons name="bow-arrow" size={17} color={'black'} />
            )}
            {item.weapon_type === 3 && (
              <MaterialCommunityIcons  name="fruit-grapes" size={17} color={'black'} />
            )}
            {item.attack_type === 1 && (
              <FontAwesome  name="group" size={17} color={'black'} />
            )}
            {item.attack_type === 2 && (
              <FontAwesome  name="user" size={17} color={'black'} />
            )}
            <Text style={styles.reportText}>{item.name}</Text>

            
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.subHeader}>{title}</Text>
        )}
      />
    </Animated.View>
  )
}

export default Attack_Drawer

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
    backgroundColor: '#4a1241'
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
});
