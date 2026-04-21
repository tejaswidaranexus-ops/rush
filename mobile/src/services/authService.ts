import api from "./api";

type SendOtpPayload = {
  phone: string;
  termsAccepted: boolean;
};

export const sendOtp = async (data: SendOtpPayload) => {
  const res = await api.post("/auth/send-otp", data);
  return res.data;
};

export const verifyOtp = async (phone: string, otp: string) => {
  const res = await api.post("/auth/verify-otp", {
    phone,
    otp,
  });

  return res.data;
};