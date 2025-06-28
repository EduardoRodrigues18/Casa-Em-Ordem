// src/services/taskService.js
import { Alert } from 'react-native';
import { supabase } from '../../lib/Supabase';

export async function getUserTasks() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    Alert.alert('Erro', 'Usuário não autenticado.');
    return null;
  }

  const id = userData.user.id;

  const { data: relacoes, error } = await supabase
    .from('task_usuarios')
    .select('task_id, tasks (id, titulo, concluida, created_at)')
    .eq('user_id', id);

  if (error) {
    Alert.alert('Erro ao buscar tarefas', error.message);
    return null;
  }

  const mapa = new Map();
  relacoes.forEach((r) => mapa.set(r.task_id, r.tasks));
  const tarefas = Array.from(mapa.values()).sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  return tarefas;
}

export async function toggleTaskStatus(id, currentStatus) {
  const { error } = await supabase
    .from('tasks')
    .update({ concluida: !currentStatus })
    .eq('id', id);

  if (error) {
    Alert.alert('Erro ao atualizar tarefa', error.message);
    return false;
  }
  return true;
}

export async function deleteTaskById(id) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) {
    Alert.alert('Erro ao excluir tarefa', error.message);
    return false;
  }
  return true;
}
