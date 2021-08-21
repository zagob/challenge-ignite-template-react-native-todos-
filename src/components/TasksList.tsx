import React from 'react';
import { 
  FlatList, 
  TextInputProps,
} from 'react-native';

import { ItemWrapper } from './ItemWrapper';
import { TaskItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps extends TextInputProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TasksList({ 
  tasks, 
  toggleTaskDone, 
  removeTask, 
  editTask, 
  onFocus }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem 
              editTask={editTask}
              removeTask={removeTask}
              toggleTaskDone={toggleTaskDone}
              task={item}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}