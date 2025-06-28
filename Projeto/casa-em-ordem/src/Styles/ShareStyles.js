// src/styles/ShareStyles.js
import { StyleSheet } from 'react-native';

export const shareStyles = StyleSheet.create({
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
    left: -50,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C63FF',
  },
  solicitacaoContainer: {
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  solicitacaoTexto: {
    fontSize: 16,
    marginBottom: 8,
  },
  botoesLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botaoCompartilhar: {
    flex: 1,
    marginHorizontal: 5,
  },
});
