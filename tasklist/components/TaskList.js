import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import Task from './Task';


const TaskList = (props) => {

    console.log(props);

    const deleteTaskFromList = (index) => {
        props.setTaskArr(prevTaskArr => {
            const updatedTasks = [...prevTaskArr];
            updatedTasks.splice(index, 1);
            props.saveTaskList(updatedTasks);
            return updatedTasks;
        });
    };

    const setStateOfTask = (index) => {
        props.setTaskArr(prevTaskArr => {
            prevTaskArr[index][1] = !prevTaskArr[index][1];
            props.saveTaskList(prevTaskArr);
            return prevTaskArr;
        });
    }

    props.taskList.map((task, index) => ( 
        console.log(task[1])
    ));

    return (
        <View style={styles.tasksWrapper}>
            <ScrollView style = {styles.tasks}>
                {props.taskList.map((task, index) => (
                <Task key={index} id = {index} text={task[0]} initialState = {task[1]} deleteTask={() => deleteTaskFromList(index)}  setTask = {() => setStateOfTask(index)}/>
                ))}
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    tasksWrapper: {
        backgroundColor: 'rgba(178, 218, 250, 0.5)',
        borderRadius: 10,
        paddingTop: 20,
        paddingHorizontal: 20,
        flex: 1,
      },
      tasks: {
        marginBottom: 16,
      },
});

export default TaskList;