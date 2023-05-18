import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Task from './components/Task';
import { useState } from 'react';

export default function App() {

  const [inputTask, setInputTask] = useState("");
  const [taskArr, setTaskArr] = useState([]);

  const addTaskToList = () => {
    if ((inputTask) != "") {
      setTaskArr([...taskArr, inputTask]);
      setInputTask("");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style = {styles.sectionTittle}>Lista de la compra</Text>
        <View style = {styles.tasks}>
          {taskArr.map((task, index) => (
            <Task key={index} text={task} />
          ))}
        </View>
        <View style = {styles.addItem}>
          <TextInput
            style={styles.input}
            onChangeText={setInputTask}
            value={inputTask}
          />
          <TouchableOpacity style = {styles.addButton} title="Añadir" onPress={addTaskToList}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTittle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  tasks: {

  },
  input: {
    height: 40,
    marginLeft: 12,
    borderWidth: 1,
    padding: 10,
    borderTopLeftRadius: 5,  // Redondear la esquina superior izquierda
    borderBottomLeftRadius: 5,
  },
  addButton: {
    height: 40,
    marginRight: 12,
    borderWidth: 1,
    padding: 10,
    borderTopRightRadius: 5,  // Redondear la esquina superior izquierda
    borderBottomRightRadius: 5,
  },
  addButtonText: {

  },
  addItem :{
    flexDirection:'row',
    alignItems:'center',
  },
});
