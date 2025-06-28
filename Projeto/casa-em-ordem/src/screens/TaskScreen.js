// src/screens/TasksScreen.js
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../constants/Styles';
import { deleteTaskById, getUserTasks, toggleTaskStatus } from '../Services/taskService';
import { styles } from '../Styles/TasksScreenStyles';

export default function TasksScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tarefas = await getUserTasks();
      if (tarefas) setTasks(tarefas);
    };

    fetchTasks();
  }, []);

  const toggleTask = async (id, currentStatus) => {
    const success = await toggleTaskStatus(id, currentStatus);
    if (success) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, concluida: !task.concluida } : task
        )
      );
    }
  };

  const deleteTask = async (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteTaskById(id);
            if (success) setTasks((prev) => prev.filter((task) => task.id !== id));
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('Home')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#6C63FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tarefas</Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity
              style={styles.taskButton}
              onPress={() => toggleTask(item.id, item.concluida)}
            >
              <Ionicons
                name={item.concluida ? 'checkbox' : 'square-outline'}
                size={24}
                color="#6C63FF"
              />
              <Text
                style={[
                  styles.taskText,
                  item.concluida && { textDecorationLine: 'line-through', color: '#888' },
                ]}
              >
                {item.titulo}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Ionicons name="trash" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        style={{ width: '100%', marginTop: 20 }}
      />
    </View>
  );
}
