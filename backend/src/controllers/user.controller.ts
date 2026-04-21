import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { supabaseAdmin } from '../config/supabase';


// 🔹 GET /me
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 🔹 check jobseeker profile
    const { data: jsProfile } = await supabaseAdmin
      .from('jobseeker_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    // 🔹 check preferences (IMPORTANT)
    const { data: preferences } = await supabaseAdmin
      .from('jobseeker_preferences')
      .select('id')
      .eq('user_id', userId)
      .single();

    // 🔹 check employer profile
    const { data: empProfile } = await supabaseAdmin
      .from('employer_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    return res.json({
      user: data,

      hasJobseekerProfile: !!jsProfile,
      hasPreferences: !!preferences,
      hasEmployerProfile: !!empProfile
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


// 🔹 POST /select-role
export const selectRole = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { role } = req.body;

    if (!role || !['jobseeker', 'employer'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ role })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error('Failed to update role');
    }

    return res.json({
      message: 'Role selected successfully',
      user: data
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

