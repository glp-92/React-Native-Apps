import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const Task = (props) => {

    const deleteTask = () => {
        props.deleteTask();
    };

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemLeft}>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <View style={styles.trashView}>
                <TouchableOpacity style={styles.trashButton} onPress={deleteTask} hitSlop={{ top: 10, bottom: 10, left: 10, right: 0 }}>
                    <FontAwesome name="trash" size={20} color="black" style={styles.trash}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

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
      fontSize: 12,
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