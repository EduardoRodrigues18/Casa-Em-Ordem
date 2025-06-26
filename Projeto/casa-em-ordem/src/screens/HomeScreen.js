import { useRoute } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../constants/Styles';

export default function LoginScreen({ navigation }) {
  const route = useRoute(); 

  const handleHome = async () => {
    navigation.replace('Configuracoes');
  };

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity style={globalStyles.button} onPress={handleHome}>
        <Text style={globalStyles.buttonText}>Tasks</Text>
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
