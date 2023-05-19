import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { BsFillCalendar2Fill } from 'react-icons/bs';
import { AiFillGithub } from 'react-icons/ai';

import Task from './components/Task';


const saveTaskArr = async (list) => {
  try {
    // Convierte el array de strings en formato JSON antes de almacenarlo
    const jsonList = JSON.stringify(list);
    await AsyncStorage.setItem('taskAPPList', jsonList);
    console.log('Lista guardada exitosamente');
  } catch (error) {
    console.log('Error al guardar la lista:', error);
  }
};


export default function App() {
  const [inputTask, setInputTask] = useState("");
  const [taskArr, setTaskArr] = useState([]);

  const fetchStoredList = async () => {
    try {
      const storedList = await AsyncStorage.getItem('taskAPPList');
      if (storedList !== null) {
        const parsedList = JSON.parse(storedList);
        setTaskArr(parsedList);
      }
    } catch (error) {
      console.log('Error al obtener la lista:', error);
    }
  };

  useEffect(() => {
    fetchStoredList();
  }, []);

  const addTaskToList = () => {
    if ((inputTask) != "") {
      const updatedTasks = [...taskArr, inputTask]
      setTaskArr(updatedTasks);
      saveTaskArr(updatedTasks);
      setInputTask("");
    }
  }

  const deleteTaskFromList = (index) => {
    const updatedTasks = [...taskArr];
    updatedTasks.splice(index, 1);
    setTaskArr(updatedTasks);
    saveTaskArr(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <BsFillCalendar2Fill style = {styles.calendarIcon}/>
        <ScrollView style = {styles.tasks}>
          {taskArr.map((task, index) => (
            <Task key={index} text={task} deleteTask={() => deleteTaskFromList(index)}/>
          ))}
        </ScrollView>
        <View style = {styles.addItem}>
          <TextInput
            style={styles.input}
            onChangeText={setInputTask}
            value={inputTask}
            maxLength={20}
          />
          <TouchableOpacity style = {styles.addButton} title="Añadir" onPress={addTaskToList}>
            <BiMessageSquareAdd style = {styles.addIcon}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(220, 220, 255, 0.5)',
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  tasksWrapper: {
    backgroundColor: 'rgba(178, 218, 250, 0.5)',
    borderRadius: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
    width: '80%',
  },
  calendarIcon: {
    alignSelf: 'center',
    fontSize: 50,
    color: '#1A237E',
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    opacity: 0.7,
  },
  tasks: {
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 50,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    color: '#1A237E',
  },
  addButton: {
    width: '20%',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: '#64B5F6',
    backgroundColor: 'rgba(100, 181, 246, 0.2)',
    color: '#1A237E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    color: 'rgba(30, 30, 255, 0.8)',
    opacity: 0.8,
  },
  addItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(200, 200, 255, 0.5)',
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  },
});

