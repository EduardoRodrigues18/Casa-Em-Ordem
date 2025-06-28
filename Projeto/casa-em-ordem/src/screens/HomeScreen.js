import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../constants/Styles';

export default function LoginScreen({ navigation }) {
  const route = useRoute(); 

  const handleHome = async () => {
    navigation.replace('Configuracoes');
  };
    const HandleTask = async () => {
    navigation.replace('Tasks');
  };
      const HandleAddTask = async () => {
    navigation.replace('CadastroTasks');
  };
  const HandleShare = async () => {
    navigation.replace('CompartilharTarefa');
  };
  const Exit = async () => {
    navigation.replace('Login');
  };
  return (
    <View style={globalStyles.container}>
      <Text style={styles.headerTitle}>Tela Inicial</Text>
      <TouchableOpacity style={globalStyles.button} onPress={HandleTask}>
        <Text style={globalStyles.buttonText}>Tarefas</Text>
      </TouchableOpacity>
    <TouchableOpacity style={globalStyles.button} onPress={HandleAddTask}>
        <Text style={globalStyles.buttonText}>Cadastro Tarefas</Text>
      </TouchableOpacity>
            <TouchableOpacity style={globalStyles.button} onPress={handleHome}>
        <Text style={globalStyles.buttonText}>Configurações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.button} onPress={HandleShare}>
        <Text style={globalStyles.buttonText}>Compartilhar Tarefas</Text>
      </TouchableOpacity>
            <TouchableOpacity style={globalStyles.button} onPress={Exit}>
        <Text style={globalStyles.buttonText}>Sair</Text>
      </TouchableOpacity>
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
  backButton: {
    position: 'absolute',
    left: -130,
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