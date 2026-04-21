import api from "./api";

export const upsertJobseekerProfile = async (data: any) => {
  const res = await api.post("/jobseeker/profile", data);
  return res.data;
};