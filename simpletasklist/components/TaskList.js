import { StyleSheet, View, ScrollView } from 'react-native';

import Task from './Task';


const TaskList = (props) => {
    const { id, saveTaskList, setTaskArr, setStateOfTask, taskArr} = props;

    const deleteTaskFromList = (index) => {
        setTaskArr(prevTaskArr => {
            const updatedTasks = [...prevTaskArr];
            updatedTasks.splice(index, 1);
            saveTaskList(updatedTasks);
            setTaskArr(updatedTasks);
            return updatedTasks;
        });
    };

    return (
        <View style={styles.tasksWrapper}>
            <ScrollView style = {styles.tasks}>
                {taskArr.map((task, index) => (
                <Task key={index} id = {index} text = {task[0]} state = {task[1]} deleteTask = {() => deleteTaskFromList(index)}  setTask = {() => setStateOfTask(index)}/>
                ))}
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    tasksWrapper: {
        backgroundColor: 'rgba(178, 218, 250, 0.5)',
        paddingTop: 60,
        paddingHorizontal: 10,
        flex: 1,
      },
      tasks: {
        marginBottom: 20,
      },
});

export default TaskList;