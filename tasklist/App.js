//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import TaskList from './components/TaskList';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [taskArr, setTaskArr] = useState([]);
  const [inputTask, setInputTask] = useState("");
  useEffect(() => {
    fetchStoredTaskList();
  }, []);


  const fetchStoredTaskList = async () => {
    try {
      const storedList = await AsyncStorage.getItem("taskAPPList");
      if (storedList !== null) {
        const parsedList = JSON.parse(storedList);
        setTaskArr(parsedList);
      }
    } catch (error) {
      console.log('Error al obtener la lista:', error);
    }
  };


  const saveTaskList = async (list) => {
    try {
      // Convierte el array de strings en formato JSON antes de almacenarlo
      const jsonList = JSON.stringify(list);
      await AsyncStorage.setItem("taskAPPList", jsonList);
      /*console.log(list);
      console.log('Lista guardada exitosamente');*/
    } catch (error) {
      console.log('Error al guardar la lista:', error);
    }
  };


  const addTaskToList = () => {
    if ((inputTask) != "") {
      const updatedTasks = [...taskArr, inputTask]
      setTaskArr(updatedTasks);
      saveTaskList(updatedTasks);
      setInputTask("");
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>

        <TaskList id = "taskAPPList" saveTaskList = {saveTaskList} setTaskArr = {setTaskArr} taskList = {taskArr}/>

        <View style = {styles.addItem}>
          <TextInput
            style={styles.input}
            onChangeText={setInputTask}
            value={inputTask}
            maxLength={20}
          />
          <TouchableOpacity style = {styles.addButton} title="Añadir" onPress={addTaskToList}>
            <Entypo name="add-to-list" size={15} color="black" style = {styles.addIcon}/>
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
    paddingTop: 40,
    padding: 0,
    alignItems: 'center',
  },
  tasksWrapper: {
    backgroundColor: 'rgba(178, 218, 250, 0.5)',
    borderRadius: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
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
    width: '75%',
    height: 50,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    color: '#1A237E',
    fontSize: 18,
  },
  addButton: {
    width: '20%',
    height: 50,
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
    justifyContent: 'space-between',
    backgroundColor: 'rgba(200, 200, 255, 0.5)',
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  },
});