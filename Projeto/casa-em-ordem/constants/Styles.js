import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#6B46C1', // Roxo da borda e título
  secondary: '#a6ebf2', // Cor do botão
  background: '#F7FAFC', // Fundo claro
  text: '#FFF', // Texto do botão
  inputBackground: '#FFF', // Fundo dos inputs
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    color: colors.primary,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.inputBackground,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 2,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});