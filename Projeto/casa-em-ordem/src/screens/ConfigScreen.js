import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../constants/Styles';
import { fetchUserNome, logoutUser, saveUserNome } from '../Services/configService';
import { styles } from '../Styles/ConfigScreenStyles';

export default function ConfigScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchUserNome();
        if (result) {
          setUserId(result.userId);
          setNome(result.nome || '');
        } else {
          Alert.alert('Erro', 'Usuário não autenticado ou nome não encontrado.');
        }
      } catch (error) {
        Alert.alert('Erro', error.message);
      }
    };

    fetchData();
  }, []);

  const handleSalvarNome = async () => {
    if (!userId) return;

    try {
      await saveUserNome(userId, nome);
      Alert.alert('Sucesso', 'Nome atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigation.replace('Auth');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
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