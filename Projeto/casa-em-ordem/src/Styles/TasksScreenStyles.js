// src/styles/TasksScreenStyles.js
import { StyleSheet } from 'react-native';

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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#a6ebf2',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
  },
  taskText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#FFF',
  },
  taskButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
