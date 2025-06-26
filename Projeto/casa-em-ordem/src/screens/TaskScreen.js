import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../constants/Styles';
import { supabase } from '../../lib/Supabase';

export default function TasksScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);

  // Buscar tarefas do usuário
  useEffect(() => {
    const fetchTasks = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData?.user) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }

      const id = userData.user.id;
      setUserId(id);

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', id)
        .order('created_at', { ascending: false });

      if (error) {
        Alert.alert('Erro ao buscar tarefas', error.message);
      } else {
        setTasks(data);
      }
    };

    fetchTasks();
  }, []);

  const toggleTask = async (id, currentStatus) => {
    const { error } = await supabase
      .from('tasks')
      .update({ concluida: !currentStatus })
      .eq('id', id);

    if (error) {
      Alert.alert('Erro ao atualizar tarefa', error.message);
    } else {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, concluida: !task.concluida } : task
        )
      );
    }
  };
  const deleteTask = (id) => {
  Alert.alert(
    'Confirmar exclusão',
    'Tem certeza que deseja excluir esta tarefa?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id);

          if (error) {
            Alert.alert('Erro ao excluir tarefa', error.message);
          } else {
            setTasks((prev) => prev.filter((task) => task.id !== id));
          }
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
        style={{ flexDirection: 'row', alignItems: 'center' }}
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
            item.concluida && { textDecorationLine: 'line-through', color: '#FFF' },
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

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginTop: 40,
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    left: -130,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C63FF',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
  },
  taskText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#FFF'
  },
  taskItem: {
  flexDirection: 'row',
  justifyContent: 'space-between', // isso move a lixeira pro canto direito
  alignItems: 'center',
  backgroundColor: '#a6ebf2',
  padding: 12,
  marginBottom: 10,
  borderRadius: 10,
  width: '100%',
},

});
