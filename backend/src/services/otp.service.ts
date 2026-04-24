import { supabaseAdmin } from '../config/supabase';
import { generateOtp } from '../utils/generateOtp';
import { sendOtpSMS } from './msg91.service';
import { findUserByPhone, createUser } from './user.service';
import { generateToken } from '../utils/jwt';

const OTP_EXPIRY_MINUTES = 5;

export const sendOtp = async (phone: string, termsAccepted: boolean) => {
  const otp = generateOtp();

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRY_MINUTES);

  // Save OTP in DB
  const { error } = await supabaseAdmin
    .from('otp_codes')
    .insert([
      {
        phone_number: phone,
        otp,
        expires_at: expiresAt.toISOString(),
        attempts: 0,
        terms_accepted: termsAccepted 
      }
    ]);

  if (error) {
    throw new Error('Failed to store OTP');
  }

  // Send SMS via MSG91
  //await sendOtpSMS(phone, otp);
  try {
    await sendOtpSMS(phone, otp);
  } catch (e) {
    console.log("SMS failed, using mock OTP");
  }

  return { 
    success: true,
    otp
  };
};

export const verifyOtp = async (phone: string, otp: string) => {
  const { data, error } = await supabaseAdmin
    .from('otp_codes')
    .select('*')
    .eq('phone_number', phone)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    throw new Error('OTP not found');
  }

  if (!data.terms_accepted) {
    throw new Error('Terms not accepted');
  }

  const now = new Date();
  const expiry = new Date(data.expires_at);

  if (expiry.getTime() < now.getTime()) {
    throw new Error('OTP expired');
  }

  if (data.attempts >= 5) {
    throw new Error('Too many attempts');
  }

  if (data.otp !== otp) {
    await supabaseAdmin
      .from('otp_codes')
      .update({ attempts: data.attempts + 1 })
      .eq('id', data.id);

    throw new Error('Invalid OTP');
  }

  // ✅ DELETE OTP
  await supabaseAdmin
    .from('otp_codes')
    .delete()
    .eq('id', data.id);

  // 🔥 USER LOGIC STARTS HERE
  let user = await findUserByPhone(phone);

  if (!user) {
    user = await createUser(phone);
  }

  // ✅ UPDATE TERMS HERE
  const { data: updatedUser } = await supabaseAdmin
    .from('profiles')
    .update({
      terms_accepted: true,
      terms_accepted_at: new Date().toISOString()
    })
    .eq('id', user.id)
    .select()
    .single();

  const token = generateToken(user.id);

  return {
    success: true,
    token,
    user: updatedUser
  };
};
