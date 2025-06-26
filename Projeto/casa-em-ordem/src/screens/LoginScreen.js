import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../constants/Styles';
import { supabase } from '../../lib/Supabase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const route = useRoute(); 
  const nome = route.params?.nome;

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      Alert.alert('Erro', error.message);
      return;
    }

    const user = data.user;

    // Verifica se já existe registro na tabela 'usuarios'
    const { data: usuarioExistente, error: selectError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('user_id', user.id)
      .single();


    if (selectError && selectError.code !== 'PGRST116') {
      Alert.alert('Erro ao verificar dados', selectError.message);
      return;
    }

    if (!usuarioExistente && nome) {
      // Se não existe, cria
      const { error: insertError } = await supabase.from('usuarios').insert([
        {
          user_id: user.id,
          nome: nome,
        },
      ]);

      if (insertError) {
        Alert.alert('Erro ao salvar dados', insertError.message);
      }
    }

    navigation.replace('Home');
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Login</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Senha"
        secureTextEntry
        autoCapitalize="none"
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Acessar</Text>
      </TouchableOpacity>

      <Text onPress={() => navigation.navigate('Cadastro')}>
        Não tem conta? Cadastre-se
      </Text>
    </View>
  );
}
