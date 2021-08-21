import React, { useEffect, useRef, useState } from 'react';
import { 
  Image, 
  TouchableOpacity, 
  View, 
  Text, 
  StyleSheet,
  TextInput,
  TextInputProps, } from "react-native";

import trashIcon from '../assets/icons/trash/trash.png'
import Icon from 'react-native-vector-icons/Feather';
import { Task } from "./TasksList";

interface TaskItemProps extends TextInputProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({ editTask, removeTask, task, toggleTaskDone }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitleValue(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, taskNewTitleValue);
    setIsEditing(false);
  }
  
  return (
    <>
      <View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
              >
                <View 
                  style={task.done === true ? styles.taskMarkerDone : styles.taskMarker}
                >
                  { task.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <Text 
                  style={task.done === true ? styles.taskTextDone : styles.taskText}
                >
                  {/* {item.title} */}
                </Text>
                  <TextInput
                    style={task.done === true ? styles.taskTextDone : styles.taskText}
                    value={taskNewTitleValue}
                    onChangeText={setTaskNewTitleValue}
                    editable={isEditing}
                    onSubmitEditing={handleSubmitEditing}
                    ref={textInputRef}
                  />
              </TouchableOpacity>
            </View>
           <View style={{
             flexDirection: 'row', 
             justifyContent: 'center', marginHorizontal: 22}}>
              {isEditing ? (
                 <TouchableOpacity
                 onPress={handleCancelEditing}
               >
                 <Icon name="x" size={24} color="#b2b2b2" />
               </TouchableOpacity>
              ) : (
                <TouchableOpacity
                onPress={handleStartEditing}
              >
                <Icon name="edit" size={24} color="#b2b2b2" />
              </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => removeTask(task.id)}
                disabled={isEditing}
              >
                <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
              </TouchableOpacity>
           </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})