import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { supabaseAdmin } from '../config/supabase';

export const upsertEducation = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { education_list } = req.body;

    if (!education_list || education_list.length === 0) {
      return res.status(400).json({
        error: 'Education data required'
      });
    }

    const { data, error } = await supabaseAdmin
      .from('jobseeker_education')
      .upsert(
        education_list.map((edu: any) => ({
          user_id: userId,
          education_level: edu.education_level,
          institute_name: edu.institute_name,
          degree: edu.degree,
          specialization: edu.specialization,
          start_year: edu.start_year,
          end_year: edu.end_year
        })),
        {
          onConflict: 'user_id,education_level'
        }
      )
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return res.json({
      message: 'Education saved',
      education: data
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};