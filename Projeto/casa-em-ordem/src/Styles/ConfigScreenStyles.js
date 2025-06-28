import { StyleSheet } from 'react-native';
import { colors } from '../../constants/Styles';

export const styles = StyleSheet.create({
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
    left: -110,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary, // Usando cor primária do globalStyles
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
  },
});