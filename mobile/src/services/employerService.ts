import api from "./api";

// ✅ GET PROFILE
export const getEmployerProfile = async () => {
  const res = await api.get("/employer/profile");
  return res.data.profile;
};

// ✅ SAVE / UPDATE PROFILE (upsert)
export const saveEmployerProfile = async (payload: any) => {
  const res = await api.post("/employer/profile", payload);
  return res.data;
};