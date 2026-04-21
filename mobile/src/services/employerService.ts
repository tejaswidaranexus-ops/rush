import api from "./api";

export const saveEmployerProfile = async (data: any) => {
  const res = await api.post("/employer/profile", data);
  return res.data;
};