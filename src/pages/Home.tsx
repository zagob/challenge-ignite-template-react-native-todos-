import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newDateTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    const titleTodo = tasks.some(item => item.title === newDateTask.title)
    
    if (titleTodo === true) {
      return Alert.alert('ATENÇÃO! Já existe um item com mesmo nome', 'escreva um nove diferente!')
    }
    setTasks(oldState => [...oldState, newDateTask]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldState => oldState.map(item => 
      item.id === id ? {...item, done: !item.done} : item
      ))
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Deseja excluir esse todo?', '', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Ok',
        onPress: () => setTasks(oldState => oldState.filter(item =>
          item.id !== id
        ))
      }
    ])
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    setTasks(oldState => oldState.map(item => 
      item.id === taskId ? {...item, title: taskNewTitle} : item
      ))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})