import { Request, Response } from 'express';
import { sendOtp, verifyOtp } from '../services/otp.service';

export const sendOtpController = async (req: Request, res: Response) => {
  try {
    const { phone, termsAccepted } = req.body;

    if (!phone) {
      return res.status(400).json({ error: 'Phone is required' });
    }

    if (!termsAccepted) {
      return res.status(400).json({ error: 'You must accept terms' });
    }

    const result = await sendOtp(phone, termsAccepted);

    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP required' });
    }

    const result = await verifyOtp(phone, otp);

    return res.json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};