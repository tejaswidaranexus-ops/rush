import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { supabaseAdmin } from '../config/supabase';

export const createJob = async (req: AuthRequest, res: Response) => {
  const now = new Date();
  const editExpiresAt = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes from now

  try {
    const userId = req.user?.userId;

    const {
      title,
      //category,
      domain,
      role,
      description,
      skills,
      openings,
      salary,
      payment_frequency,
      benefits,
      job_location,
      job_pincode,
      latitude,
      longitude,
      work_type,
      shift,
      duration,
      employer_name,
      contact,
      eligibility,
      terms,
      verification
    } = req.body;

    const { data, error } = await supabaseAdmin
      .from('jobs')
      .insert([
        {
          employer_id: userId,
          title,
          //category,
          domain,
          role,
          description,
          skills,
          openings,
          salary,
          payment_frequency,
          benefits,
          job_location,
          job_pincode,
          latitude,
          longitude,
          work_type,
          shift,
          duration,
          employer_name,
          contact,
          eligibility,
          terms,
          verification,
          edit_expires_at: editExpiresAt.toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      //throw new Error('Failed to create job');
      return res.status(400).json({ error: error.message });
    }

    return res.json({
      message: 'Job created',
      job: data
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const getMyJobs = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    const { data, error } = await supabaseAdmin
      .from('jobs')
      .select('*')
      .eq('employer_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error('Failed to fetch jobs');
    }

    return res.json({
      jobs: data
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const deleteJob = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { jobId } = req.params;

    const { error } = await supabaseAdmin
      .from('jobs')
      .delete()
      .eq('id', jobId)
      .eq('employer_id', userId); // 🔒 security

    if (error) {
      throw new Error('Failed to delete job');
    }

    return res.json({
      message: 'Job deleted'
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const updateJob = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { jobId } = req.params;

    const updates = req.body;

    // 🔹 get job
    const { data: job } = await supabaseAdmin
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .eq('employer_id', userId)
      .single();

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const now = new Date();

    // 🔹 check edit window
    const isEditable = job.edit_expires_at &&
      new Date(job.edit_expires_at) > now;

      
    const allowedUpdates: any = {};

    if (!isEditable) {
      if (updates.description !== undefined) allowedUpdates.description = updates.description;
      if (updates.salary !== undefined) allowedUpdates.salary = updates.salary;
      if (updates.openings !== undefined) allowedUpdates.openings = updates.openings;
      if (updates.contact !== undefined) allowedUpdates.contact = updates.contact;
      if (updates.benefits !== undefined) allowedUpdates.benefits = updates.benefits;
      if (updates.eligibility !== undefined) allowedUpdates.eligibility = updates.eligibility;
      if (updates.terms !== undefined) allowedUpdates.terms = updates.terms;
      if (updates.verification !== undefined) allowedUpdates.verification = updates.verification;
    } else {
      Object.assign(allowedUpdates, updates);
    }


    const { data, error } = await supabaseAdmin
      .from('jobs')
      .update(allowedUpdates)
      .eq('id', jobId)
      .select()
      .single();

    if (error) {
      throw new Error('Failed to update job');
    }

    return res.json({
      message: isEditable
        ? 'Job updated'
        : 'Limited fields updated (edit window expired)',
      job: data
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};