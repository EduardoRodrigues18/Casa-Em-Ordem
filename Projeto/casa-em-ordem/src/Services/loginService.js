import { supabase } from '../../lib/Supabase';

export const loginUser = async (email, senha) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
};

export const checkOrCreateUser = async (userId, nome) => {
  const { data: usuarioExistente, error: selectError } = await supabase
    .from('usuarios')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (selectError && selectError.code !== 'PGRST116') {
    throw new Error(selectError.message);
  }

  if (!usuarioExistente && nome) {
    const { error: insertError } = await supabase.from('usuarios').insert([
      {
        user_id: userId,
        nome: nome,
      },
    ]);

    if (insertError) {
      throw new Error(insertError.message);
    }
  }
};