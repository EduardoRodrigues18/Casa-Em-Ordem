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

    // 1. Inserir na tabela tasks
    const { data: novaTask, error: insertError } = await supabase
      .from('tasks')
      .insert([
        {
          titulo,
          concluida: false,
        },
      ])
      .select()
      .single(); // pegar a tarefa criada

    if (insertError) {
      Alert.alert('Erro ao salvar tarefa', insertError.message);
      return;
    }

    // 2. Relacionar na tabela task_usuarios
    const { error: relacaoError } = await supabase.from('task_usuarios').insert([
      {
        user_id: userId,
        task_id: novaTask.id,
      },
    ]);

    if (relacaoError) {
      Alert.alert('Erro ao vincular tarefa ao usuário', relacaoError.message);
      return;
    }

    Alert.alert('Sucesso', 'Tarefa cadastrada com sucesso!');
    setTitulo(''); // Volta para a tela anterior
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('Home')}  style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#6C63FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova Tarefa</Text>
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
    left: -120,
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
