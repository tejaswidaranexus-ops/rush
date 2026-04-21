import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { supabaseAdmin } from '../config/supabase';


// 🔹 Create / Update Jobseeker Profile
export const upsertJobseekerProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const {
      full_name,
      profile_image_url,

      gender,
      dob,
      location_name,
      latitude,
      longitude,
      pincode,

      education_level,
      experience
    } = req.body;

    // 🔹 1. UPDATE BASE PROFILE
    // 🔹 SAFE PROFILE UPDATE
    const profileUpdate: any = {};

    if (full_name) profileUpdate.full_name = full_name;
    if (profile_image_url) profileUpdate.profile_image_url = profile_image_url;

    if (Object.keys(profileUpdate).length > 0) {
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .update(profileUpdate)
        .eq('id', userId);

      if (profileError) {
        throw new Error('Failed to update base profile');
      }
    }


    // 🔹 2. UPSERT JOBSEEKER PROFILE
    const { data, error } = await supabaseAdmin
      .from('jobseeker_profiles')
      .upsert([
        {
          user_id: userId,
          gender,
          dob,
          location_name,
          latitude,
          longitude,
          pincode,
          education_level,
          experience
        }
      ],
      {
        onConflict: 'user_id' // 🔥 THIS IS THE FIX - With onConflict → INSERT or UPDATE → correct
      }
    )
      .select()
      .single();

    if (error) {
      throw new Error('Failed to save jobseeker profile');
    }

    return res.json({
      message: 'Profile saved successfully',
      profile: data
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};