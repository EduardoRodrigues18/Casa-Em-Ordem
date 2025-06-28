import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../constants/Styles';
import { supabase } from '../../lib/Supabase';


export default function CompartilharScreen({ navigation }) {
  const [nomeBusca, setNomeBusca] = useState('');
  const [solicitacoesRecebidas, setSolicitacoesRecebidas] = useState([]);

  const enviarSolicitacao = async () => {
    // Buscar usuário pelo nome digitado
    const { data: usuarios, error: buscaError } = await supabase
      .from('usuarios')
      .select('user_id')
      .ilike('nome', `%${nomeBusca}%`)
      .limit(1);

    if (buscaError || !usuarios || usuarios.length === 0) {
      Alert.alert('Erro', 'Usuário não encontrado.');
      return;
    }

    const destinatarioId = usuarios[0].user_id;

    // Usuário atual (remetente)
    const { data: remetenteData, error: userError } = await supabase.auth.getUser();
    if (userError || !remetenteData?.user) {
      Alert.alert('Erro', 'Erro ao obter usuário autenticado.');
      return;
    }

    const remetenteId = remetenteData.user.id;

    // Verificar se já existe solicitação pendente
    const { data: existente } = await supabase
      .from('compartilhamentos')
      .select('*')
      .eq('remetente_id', remetenteId)
      .eq('destinatario_id', destinatarioId)
      .eq('status', 'pendente');

    if (existente && existente.length > 0) {
      Alert.alert('Atenção', 'Você já enviou uma solicitação para este usuário.');
      return;
    }

    // Inserir nova solicitação
    const { error } = await supabase.from('compartilhamentos').insert([
      {
        remetente_id: remetenteId,
        destinatario_id: destinatarioId,
        status: 'pendente',
      },
    ]);

    if (error) {
      Alert.alert('Erro ao enviar solicitação', error.message);
    } else {
      Alert.alert('Solicitação enviada!');
      setNomeBusca('');
    }
  };


  const carregarSolicitacoesRecebidas = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    const userId = userData.user.id;

    // Buscar solicitações recebidas
    const { data: solicitacoes, error: solicitacaoError } = await supabase
      .from('compartilhamentos')
      .select('*') // ou selecione os campos desejados
      .eq('destinatario_id', userId)
      .eq('status', 'pendente');

    if (solicitacaoError) {
      Alert.alert('Erro ao buscar solicitações', solicitacaoError.message);
      return;
    }

    // Buscar nomes dos remetentes
    const remetenteIds = solicitacoes.map((s) => s.remetente_id);

    const { data: remetentes, error: remetentesError } = await supabase
      .from('usuarios')
      .select('user_id, nome')
      .in('user_id', remetenteIds);

    if (remetentesError) {
      Alert.alert('Erro ao buscar remetentes', remetentesError.message);
      return;
    }

    // Mesclar nomes
    const solicitacoesComNomes = solicitacoes.map((s) => {
      const remetente = remetentes.find((r) => r.user_id === s.remetente_id);
      return {
        ...s,
        nomeRemetente: remetente ? remetente.nome : 'Desconhecido',
      };
    });

    setSolicitacoesRecebidas(solicitacoesComNomes);
  };


  const responderSolicitacao = async (id, aceitar) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    const destinatarioId = userData.user.id;

    // Buscar a solicitação
    const { data: solicitacao, error: solicitacaoError } = await supabase
      .from('compartilhamentos')
      .select('*')
      .eq('id', id)
      .single();

    if (solicitacaoError || !solicitacao) {
      Alert.alert('Erro ao buscar solicitação.');
      return;
    }

    const remetenteId = solicitacao.remetente_id;

    if (aceitar) {
      // Buscar tarefas do remetente
      const { data: tasksDoRemetente, error: errorTasks } = await supabase
        .from('task_usuarios')
        .select('task_id')
        .eq('user_id', remetenteId);

      if (errorTasks) {
        Alert.alert('Erro ao buscar tarefas compartilhadas', errorTasks.message);
        return;
      }

      // Gera os vínculos
      const vinculos = tasksDoRemetente.map((t) => ({
        task_id: t.task_id,
        user_id: destinatarioId,
      }));

      const { error: insertError } = await supabase
        .from('task_usuarios')
        .insert(vinculos, { onConflict: ['task_id', 'user_id'] });

      if (insertError) {
        Alert.alert('Erro ao compartilhar tarefas', insertError.message);
        return;
      }
    }

    // Atualizar status da solicitação
    const { error: updateError } = await supabase
      .from('compartilhamentos')
      .update({ status: aceitar ? 'aceito' : 'recusado' })
      .eq('id', id);

    if (updateError) {
      Alert.alert('Erro ao atualizar status da solicitação', updateError.message);
    } else {
      Alert.alert('Resposta enviada!');
      carregarSolicitacoesRecebidas(); // recarrega a lista
    }
  };


  useEffect(() => {
    carregarSolicitacoesRecebidas();
  }, []);

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.replace('Home')}>
          <Ionicons name="arrow-back" size={28} color="#6C63FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Compartilhamentos</Text>
      </View>

      {/* Seção: Enviar solicitação */}
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

      {/* Seção: Solicitações recebidas */}
      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Solicitações Recebidas:</Text>
      <FlatList
        data={solicitacoesRecebidas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.solicitacaoContainer}>
            <Text style={styles.solicitacaoTexto}>
              De: {item.nomeRemetente || item.remetente_id}
            </Text>

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
const styles = StyleSheet.create({
  header: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginTop: 40,
    marginBottom: 10,
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
    color: '#FFF'
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionBtn: {
    flex: 1,
    marginHorizontal: 1,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between', // isso move a lixeira pro canto direito
    alignItems: 'center',
    backgroundColor: '#a6ebf2',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
  },


});
