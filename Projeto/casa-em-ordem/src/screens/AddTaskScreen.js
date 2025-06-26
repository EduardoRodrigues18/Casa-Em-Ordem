import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { globalStyles } from '../../constants/Styles';
import { supabase } from '../../lib/Supabase';


export default function AddTaskScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');

  const handleSalvar = async () => {
    if (!titulo.trim()) {
      Alert.alert('Erro', 'Digite o título da tarefa');
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }

    const userId = userData.user.id;

    const { error: insertError } = await supabase.from('tasks').insert([
      {
        user_id: userId,
        titulo,
        concluida: false,
      },
    ]);

    if (insertError) {
      Alert.alert('Erro ao salvar tarefa', insertError.message);
    } else {
      Alert.alert('Sucesso', 'Tarefa cadastrada com sucesso!');
      setTitulo('');
      navigation.goBack(); // Volta para a tela anterior (Tasks)
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('Home')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#6C63FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tarefas</Text>
      </View>

      <TextInput
        style={globalStyles.input}
        placeholder="Digite o título da tarefa"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TouchableOpacity style={globalStyles.button} onPress={handleSalvar}>
        <Text style={globalStyles.buttonText}>Salvar Tarefa</Text>
      </TouchableOpacity>

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
  },
});
