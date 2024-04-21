import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

const Home = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = () => {
    if (task.trim()) {
      if (selectedTask) {
        const updatedTasks = tasks.map(item => {
          if (item.id === selectedTask.id) {
            return { ...item, text: task };
          }
          return item;
        });
        setTasks(updatedTasks);
        setSelectedTask(null);
      } else {
        setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      }
      setTask('');
    }
  };

  const handleToggleTask = id => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = id => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleEditTask = item => {
    setTask(item.text);
    setSelectedTask(item);
  };

  const renderItem = ({ item }) => (
    <View style={styles.task}>
      <TouchableOpacity onPress={() => handleToggleTask(item.id)}>
        <Text style={item.completed ? styles.completedText : styles.text}>{item.text}</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => handleEditTask(item)}>
          <Text style={styles.editButton}>✎</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
          <Text style={styles.deleteButton}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add new task"
        value={task}
        onChangeText={text => setTask(text)}
        onSubmitEditing={handleAddTask}
      />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  completedText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    fontSize: 16,
    color: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    fontSize: 16,
    color: 'red',
  },
});


export default Home;
