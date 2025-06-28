import { supabase } from '../../lib/Supabase';

export const registerUser = async (email, senha) => {
  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password: senha,
  });

  if (signUpError) {
    throw new Error(signUpError.message);
  }

  return true;
};