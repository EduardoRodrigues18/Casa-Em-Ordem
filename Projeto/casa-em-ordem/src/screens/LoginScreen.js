import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7FAFC' },
  title: { fontSize: 24, color: '#6B46C1', marginBottom: 20 },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#6B46C1', // Borda roxa da logo
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF', // Fundo claro para contraste
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#a6ebf2', // Rosa claro da logo
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#6B46C1', // Borda roxa para harmonia
    borderWidth: 2,
  },
  buttonText: {
    color: '#FFF', // Texto branco para contraste com o fundo rosa
    fontSize: 16,
    fontWeight: 'bold',
  },
});