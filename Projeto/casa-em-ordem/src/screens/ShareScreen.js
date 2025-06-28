// src/screens/ShareScreen.js
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../constants/Styles';
import {
  carregarSolicitacoes,
  enviarSolicitacaoCompartilhamento,
  responderSolicitacaoCompartilhamento,
} from '../Services/shareService';
import { shareStyles as styles } from '../Styles/ShareStyles';

export default function CompartilharScreen({ navigation }) {
  const [nomeBusca, setNomeBusca] = useState('');
  const [solicitacoesRecebidas, setSolicitacoesRecebidas] = useState([]);

  const carregar = async () => {
    try {
      const data = await carregarSolicitacoes();
      setSolicitacoesRecebidas(data);
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  };

  const enviarSolicitacao = async () => {
    try {
      await enviarSolicitacaoCompartilhamento(nomeBusca);
      Alert.alert('Solicitação enviada!');
      setNomeBusca('');
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  };

  const responderSolicitacao = async (id, aceitar) => {
    try {
      await responderSolicitacaoCompartilhamento(id, aceitar);
      Alert.alert('Resposta enviada!');
      carregar();
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.replace('Home')}>
          <Ionicons name="arrow-back" size={28} color="#6C63FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Compartilhamentos</Text>
      </View>

      <Text style={{ fontWeight: 'bold' }}>Enviar para:</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Nome do usuário"
        value={nomeBusca}
        onChangeText={setNomeBusca}
      />
      <TouchableOpacity style={globalStyles.button} onPress={enviarSolicitacao}>
        <Text style={globalStyles.buttonText}>Enviar Solicitação</Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Solicitações Recebidas:</Text>
      <FlatList
        data={solicitacoesRecebidas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.solicitacaoContainer}>
            <Text style={styles.solicitacaoTexto}>De: {item.nomeRemetente}</Text>
            <View style={styles.botoesLinha}>
              <TouchableOpacity
                style={[globalStyles.button, styles.botaoCompartilhar]}
                onPress={() => responderSolicitacao(item.id, true)}
              >
                <Ionicons name="checkmark" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyles.button, styles.botaoCompartilhar]}
                onPress={() => responderSolicitacao(item.id, false)}
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
