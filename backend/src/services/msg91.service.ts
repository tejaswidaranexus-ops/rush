export const sendOtpSMS = async (phone: string, otp: string) => {
  console.log('========================');
  console.log('📱 MOCK OTP SENT');
  console.log(`Phone: ${phone}`);
  console.log(`OTP: ${otp}`);
  console.log('========================');

  return { success: true };
};