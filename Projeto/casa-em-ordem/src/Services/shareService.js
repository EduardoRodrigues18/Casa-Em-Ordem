// src/services/shareService.js
import { supabase } from '../../lib/Supabase';

export const enviarSolicitacaoCompartilhamento = async (nomeBusca) => {
  const { data: usuarios, error: buscaError } = await supabase
    .from('usuarios')
    .select('user_id')
    .ilike('nome', `%${nomeBusca}%`)
    .limit(1);

  if (buscaError || !usuarios || usuarios.length === 0) {
    throw new Error('Usuário não encontrado.');
  }

  const destinatarioId = usuarios[0].user_id;
  const { data: remetenteData, error: userError } = await supabase.auth.getUser();
  if (userError || !remetenteData?.user) {
    throw new Error('Erro ao obter usuário autenticado.');
  }

  const remetenteId = remetenteData.user.id;

  const { data: existente } = await supabase
    .from('compartilhamentos')
    .select('*')
    .eq('remetente_id', remetenteId)
    .eq('destinatario_id', destinatarioId)
    .eq('status', 'pendente');

  if (existente && existente.length > 0) {
    throw new Error('Você já enviou uma solicitação para este usuário.');
  }

  const { error } = await supabase.from('compartilhamentos').insert([
    {
      remetente_id: remetenteId,
      destinatario_id: destinatarioId,
      status: 'pendente',
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

export const carregarSolicitacoes = async () => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) throw new Error('Usuário não autenticado.');
  const userId = userData.user.id;

  const { data: solicitacoes, error: solicitacaoError } = await supabase
    .from('compartilhamentos')
    .select('*')
    .eq('destinatario_id', userId)
    .eq('status', 'pendente');

  if (solicitacaoError) throw new Error(solicitacaoError.message);

  const remetenteIds = solicitacoes.map((s) => s.remetente_id);
  const { data: remetentes, error: remetentesError } = await supabase
    .from('usuarios')
    .select('user_id, nome')
    .in('user_id', remetenteIds);

  if (remetentesError) throw new Error(remetentesError.message);

  return solicitacoes.map((s) => ({
    ...s,
    nomeRemetente: remetentes.find((r) => r.user_id === s.remetente_id)?.nome || 'Desconhecido',
  }));
};

export const responderSolicitacaoCompartilhamento = async (id, aceitar) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) throw new Error('Usuário não autenticado.');
  const destinatarioId = userData.user.id;

  const { data: solicitacao, error: solicitacaoError } = await supabase
    .from('compartilhamentos')
    .select('*')
    .eq('id', id)
    .single();

  if (solicitacaoError || !solicitacao) throw new Error('Erro ao buscar solicitação.');

  const remetenteId = solicitacao.remetente_id;

  if (aceitar) {
    const { data: tasksDoRemetente, error: errorTasks } = await supabase
      .from('task_usuarios')
      .select('task_id')
      .eq('user_id', remetenteId);

    if (errorTasks) throw new Error(errorTasks.message);

    const vinculos = tasksDoRemetente.map((t) => ({
      task_id: t.task_id,
      user_id: destinatarioId,
    }));

    const { error: insertError } = await supabase
      .from('task_usuarios')
      .insert(vinculos, { onConflict: ['task_id', 'user_id'] });

    if (insertError) throw new Error(insertError.message);
  }

  const { error: updateError } = await supabase
    .from('compartilhamentos')
    .update({ status: aceitar ? 'aceito' : 'recusado' })
    .eq('id', id);

  if (updateError) throw new Error(updateError.message);
};
