import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../constants/Styles';
import { registerUser } from '../Services/registerService';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async () => {
    try {
      await registerUser(email, senha);
      Alert.alert('Verifique seu e-mail', 'Confirme o cadastro antes de entrar.');
      navigation.navigate('Login', { nome });
    } catch (error) {
      Alert.alert('Erro ao criar conta', error.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Cadastro</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}