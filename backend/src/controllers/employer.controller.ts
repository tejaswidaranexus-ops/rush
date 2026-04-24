import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { supabaseAdmin } from '../config/supabase';

export const upsertEmployerProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const {
      full_name,
      profile_image_url,
      gender,
      business_name,
      business_location,
      latitude,
      longitude,
      pincode,
      business_email,
      has_business_email,
      documents
    } = req.body;

    // ✅ Validate business proof
    if (!documents || documents.length === 0) {
      return res.status(400).json({
        error: 'At least one business proof required'
      });
    }

    // 🔹 SAFE profile update
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

    // 🔹 UPSERT employer profile
    const { data, error } = await supabaseAdmin
      .from('employer_profiles')
      .upsert(
        [
          {
            user_id: userId,
            gender,
            business_name,
            business_location,
            latitude,
            longitude,
            pincode,
            business_email,
            has_business_email
          }
        ],
        {
          onConflict: 'user_id' // ✅ IMPORTANT
        }
      )
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    // 🔹 HANDLE DOCUMENTS (replace strategy)
    if (documents && documents.length > 0) {
      // delete old
      await supabaseAdmin
        .from('employer_documents')
        .delete()
        .eq('user_id', userId);

      // insert new
      const { error: docError } = await supabaseAdmin
        .from('employer_documents')
        .insert(
          documents.map((url: string) => ({
            user_id: userId,
            document_url: url
          }))
        );

      if (docError) {
        throw new Error('Failed to save documents');
      }
    }

    return res.json({
      message: 'Employer profile saved',
      profile: data
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};



export const getEmployerProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 🔹 get base profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("full_name, profile_image_url, phone_number")
      .eq("id", userId)
      .single();

    if (profileError) throw profileError;

    // 🔹 get employer profile
    const { data: employer, error: employerError } = await supabaseAdmin
      .from("employer_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (employerError && employerError.code !== "PGRST116") {
      throw employerError;
    }

    // 🔹 get documents
    const { data: documents, error: docError } = await supabaseAdmin
      .from("employer_documents")
      .select("document_url")
      .eq("user_id", userId);

    if (docError) throw docError;

    return res.json({
      profile: {
        ...profile,
        ...employer,
        documents: documents?.map((d) => d.document_url) || [],
      },
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};