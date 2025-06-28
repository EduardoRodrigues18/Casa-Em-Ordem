import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../constants/Styles';
import { checkOrCreateUser, loginUser } from '../Services/loginService';
import { styles } from '../Styles/LoginStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const route = useRoute(); 
  const nome = route.params?.nome;

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, senha);
      await checkOrCreateUser(user.id, nome);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
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

      <Text onPress={() => navigation.navigate('Cadastro')} style={styles.linkText}>
        Não tem conta? Cadastre-se
      </Text>
    </View>
  );
}