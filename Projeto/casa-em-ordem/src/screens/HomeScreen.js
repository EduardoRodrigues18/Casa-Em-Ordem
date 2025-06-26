import { useRoute } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
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

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity style={globalStyles.button} onPress={HandleTask}>
        <Text style={globalStyles.buttonText}>Tasks</Text>
      </TouchableOpacity>
    <TouchableOpacity style={globalStyles.button} onPress={HandleAddTask}>
        <Text style={globalStyles.buttonText}>CadastroTasks</Text>
      </TouchableOpacity>
            <TouchableOpacity style={globalStyles.button} onPress={handleHome}>
        <Text style={globalStyles.buttonText}>Configurações</Text>
      </TouchableOpacity>
            <TouchableOpacity style={globalStyles.button} onPress={handleHome}>
        <Text style={globalStyles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
