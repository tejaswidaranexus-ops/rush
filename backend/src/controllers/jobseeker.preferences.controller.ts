import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { supabaseAdmin } from '../config/supabase';

export const upsertPreferences = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    // ✅ MUST HAVE
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const {
      job_type,
      job_positions,
      expected_salary,
      preferred_cities
    } = req.body;

    // 🔹 VALIDATION
    if (!job_positions || job_positions.length === 0) {
      return res.status(400).json({
        error: 'At least one job position required'
      });
    }

    if (!expected_salary || Number(expected_salary) <= 0) {
      return res.status(400).json({
        error: 'Valid expected salary required'
      });
    }

    // 🔹 UPSERT (FIXED)
    const { data, error } = await supabaseAdmin
      .from('jobseeker_preferences')
      .upsert(
        [
          {
            user_id: userId,
            job_type,
            job_positions,
            expected_salary,
            preferred_cities
          }
        ],
        {
          onConflict: 'user_id' // 🔥 IMPORTANT FIX
        }
      )
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return res.json({
      message: 'Preferences saved',
      preferences: data
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};