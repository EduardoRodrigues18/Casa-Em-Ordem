import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../constants/Styles';
import { supabase } from '../../lib/Supabase';

export default function ConfigScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [userId, setUserId] = useState(null);

  // Buscar nome atual
  useEffect(() => {
    const fetchUserNome = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData?.user) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        console.log('Erro getUser:', userError);
        return;
      }

      const id = userData.user.id;
      setUserId(id);

      const { data, error } = await supabase
        .from('usuarios')
        .select('nome')
        .eq('user_id', id)
        .limit(1);

      if (error) {
        Alert.alert('Erro ao buscar nome', error.message);
      } else if (!data || data.length === 0) {
        console.log('Nenhum nome encontrado');
      } else {
        setNome(data[0].nome);
      }
    };

    fetchUserNome();
  }, []);

  // Função para salvar/atualizar nome
  const handleSalvarNome = async () => {
    if (!userId) return;

    // Verifica se o usuário já tem um registro
    const { data: existe, error: buscaErro } = await supabase
      .from('usuarios')
      .select('*')
      .eq('user_id', userId)
      .limit(1);

    if (buscaErro) {
      Alert.alert('Erro ao verificar nome', buscaErro.message);
      return;
    }

    let response;
    if (existe.length === 0) {
      // Inserir novo
      response = await supabase.from('usuarios').insert([{ user_id: userId, nome }]);
    } else {
      // Atualizar existente
      response = await supabase
        .from('usuarios')
        .update({ nome })
        .eq('user_id', userId);
    }

    if (response.error) {
      Alert.alert('Erro ao salvar nome', response.error.message);
    } else {
      Alert.alert('Sucesso', 'Nome atualizado com sucesso!');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.replace('Auth');
  };

  return (
    <View style={globalStyles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('Home')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color="#6C63FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
        </View>

      <Text style={{ fontSize: 18, marginTop: 20 }}>
        Nome do usuário: <Text style={{ fontWeight: 'bold' }}>{nome || '---'}</Text>
      </Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleSalvarNome}>
        <Text style={globalStyles.buttonText}>Salvar Nome</Text>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.button} onPress={handleLogout}>
        <Text style={globalStyles.buttonText}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
  
}
const styles = StyleSheet.create({
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
  left: -110,
  top: 0,
  bottom: 0,
  justifyContent: 'center',
  paddingLeft: 10,
},

headerTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#6C63FF', // sua cor roxa padrão
},

});