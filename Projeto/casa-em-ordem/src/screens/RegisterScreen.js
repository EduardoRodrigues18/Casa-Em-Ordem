import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../constants/Styles';
import { supabase } from '../../lib/Supabase';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async () => {
    // Cria a conta no Supabase Auth
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (signUpError) {
      Alert.alert('Erro ao criar conta', signUpError.message);
      return;
    }

    // Envia o nome como parâmetro para a tela de login
    Alert.alert('Verifique seu e-mail', 'Confirme o cadastro antes de entrar.');
    navigation.navigate('Login', { nome });
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
