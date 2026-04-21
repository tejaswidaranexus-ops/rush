import api from "./api";

export const saveEducation = async (data: any) => {
  const res = await api.post("/jobseeker/education", data);
  return res.data;
};