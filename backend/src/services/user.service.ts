import { supabaseAdmin } from '../config/supabase';

export const findUserByPhone = async (phone: string) => {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('phone_number', phone)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error('Error fetching user');
  }

  return data;
};

export const createUser = async (phone: string) => {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .insert([{ phone_number: phone }])
    .select()
    .single();

  if (error) {
    throw new Error('Error creating user');
  }

  return data;
};