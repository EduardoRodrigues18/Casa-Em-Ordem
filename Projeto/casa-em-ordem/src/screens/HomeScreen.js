import { useRoute } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../constants/Styles';
import { navigateTo } from '../Services/homeService';
import { styles } from '../Styles/HomeScreenStyles';

export default function HomeScreen({ navigation }) {
  const route = useRoute();

  const handleHome = () => navigateTo(navigation, 'Configuracoes');
  const handleTask = () => navigateTo(navigation, 'Tasks');
  const handleAddTask = () => navigateTo(navigation, 'CadastroTasks');
  const handleShare = () => navigateTo(navigation, 'CompartilharTarefa');
  const handleExit = () => navigateTo(navigation, 'Login');

  return (
    <View style={globalStyles.container}>
      <Text style={styles.headerTitle}>Tela Inicial</Text>
      <TouchableOpacity style={globalStyles.button} onPress={handleTask}>
        <Text style={globalStyles.buttonText}>Tarefas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.button} onPress={handleAddTask}>
        <Text style={globalStyles.buttonText}>Cadastro Tarefas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.button} onPress={handleHome}>
        <Text style={globalStyles.buttonText}>Configurações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.button} onPress={handleShare}>
        <Text style={globalStyles.buttonText}>Compartilhar Tarefas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.button} onPress={handleExit}>
        <Text style={globalStyles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}