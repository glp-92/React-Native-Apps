import React from 'react';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated, PanResponder } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 


const Task = (props) => {
  const { id, text, initialState, deleteTask, setTask } = props;
  const pan = useRef(new Animated.ValueXY()).current;
  const initialPosition = { x: 0, y: 0 };
  const [state, setState] = useState(initialState);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        //return true if user is swiping, return false if it's a single click
        return !(gestureState.dx === 0 && gestureState.dy === 0)                  
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x }], {useNativeDriver: false}),
      onPanResponderRelease: (event, gestureState) => {
        const { dx } = gestureState;
        const isInDeleteZone = Math.abs(dx) > 100;
        if (isInDeleteZone) {
          deleteTask(id);
        }
        Animated.spring(pan, {
          toValue: initialPosition,
          speed: 20,
          useNativeDriver: false
        },).start();
      },
    })
  ).current;

  const handleStateChange = () => {
    setTask(id);
    setState(!state);
  }

  // {state && <FontAwesome name="trash" size={15} color="black" style={styles.trash} />}
  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
      }}
      {...panResponder.panHandlers}
    >
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.touchableLeft}
          onPress={handleStateChange}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 0 }}
        >
          {state ? <FontAwesome name="check" size={20} color="green" /> : null}
        </TouchableOpacity>
        <View style = {styles.textContainer}>
          <Text style={styles.itemText}>{text}</Text>
        </View>
        <TouchableOpacity
          style={styles.touchableRight}
          onPress={() => deleteTask(id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 0 }}
        >
          <FontAwesome name="trash" size={15} color="black" style={styles.trash} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
    itemContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(200, 200, 255, 0.5)',
      borderRadius: 10,
      padding: 5,
      marginBottom: 10,
      maxHeight: 100,
    },
    touchableLeft: {
      borderRadius: 10, // Ajusta el valor según el tamaño del botón circular deseado
      backgroundColor: 'rgba(100, 181, 246, 0.2)',
      padding: 5,
      flex: 1,
      aspectRatio: 1,
      height: '100%',
      justifyContent: 'center', // Centrar contenido verticalmente
      alignItems: 'center',
    },
    textContainer: {
      flex: 5,
      paddingLeft: 10,
    },
    itemText: {
      flexWrap: 'wrap',
      fontSize: 16,
      color: '#000',
    },
    touchableRight: {
      borderRadius: 10, // Ajusta el valor según el tamaño del botón circular deseado
      backgroundColor: 'rgba(100, 181, 246, 0.2)',
      padding: 5,
      flex: 1,
      aspectRatio: 1,
      height: '100%',
      justifyContent: 'center', // Centrar contenido verticalmente
      alignItems: 'center',
      marginLeft: 10,
    },
    trash: {
      color: 'rgba(30, 30, 255, 0.8)',
    },
  });

export default Task;