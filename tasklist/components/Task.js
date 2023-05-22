import React from 'react';
import { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated, PanResponder } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const Task = (props) => {
  const { id, text, deleteTask } = props;
  const pan = useRef(new Animated.ValueXY()).current;
  const initialPosition = { x: 0, y: 0 };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
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
        }, {useNativeDriver: false}).start();
      },
    })
  ).current;

  
  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
      }}
      {...panResponder.panHandlers}
    >
      <View style={styles.itemContainer}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>{text}</Text>
        </View>
        <View style={styles.trashView}>
          <TouchableOpacity
            style={styles.trashButton}
            onPress={() => deleteTask(id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 0 }}
          >
            <FontAwesome name="trash" size={15} color="black" style={styles.trash} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(200, 200, 255, 0.5)',
      borderRadius: 10,
      padding: 5,
      marginBottom: 10,
    },
    itemLeft: {
        flex: 2,
        height: 50,
        marginRight: 10,
        padding: 10,
        borderRadius: 10,
    },
    itemText: {
      fontSize: 18,
      color: '#000',
    },
    trashView: {
        flex: 1,
        marginLeft: 10,
    },
    trashButton: {
      height: 50,
      backgroundColor: 'rgba(100, 181, 246, 0.2)',
      borderRadius: 10,
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
    },
    trash: {
      color: 'rgba(30, 30, 255, 0.8)',
      opacity: 0.8,
    },
  });

export default Task;