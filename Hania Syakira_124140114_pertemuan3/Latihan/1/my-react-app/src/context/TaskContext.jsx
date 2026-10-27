
import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TaskContext = createContext();

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTasks harus digunakan di dalam TaskProvider');
  }

  return context;
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tasks_data', []);

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );
  };

  const toggleComplete = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  const value = {
    tasks,
    addTask,
    deleteTask,
    toggleComplete,
    stats: {
      total: tasks.length,
      completed: completedCount,
      remaining: tasks.length - completedCount,
      completionRate:
        tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0,
    },
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}
