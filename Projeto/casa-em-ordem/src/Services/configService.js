import { supabase } from '../../lib/Supabase';

export const fetchUserNome = async (userId) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    throw new Error('Usuário não autenticado.');
  }

  const id = userData.user.id;
  const { data, error } = await supabase
    .from('usuarios')
    .select('nome')
    .eq('user_id', id)
    .limit(1);

  if (error) {
    throw new Error(error.message);
  } else if (!data || data.length === 0) {
    return null;
  }

  return data[0].nome;
};

export const saveUserNome = async (userId, nome) => {
  const { data: existe, error: buscaErro } = await supabase
    .from('usuarios')
    .select('*')
    .eq('user_id', userId)
    .limit(1);

  if (buscaErro) {
    throw new Error(buscaErro.message);
  }

  let response;
  if (existe.length === 0) {
    response = await supabase.from('usuarios').insert([{ user_id: userId, nome }]);
  } else {
    response = await supabase
      .from('usuarios')
      .update({ nome })
      .eq('user_id', userId);
  }

  if (response.error) {
    throw new Error(response.error.message);
  }

  return true;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};