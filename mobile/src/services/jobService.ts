import api from "./api";

export const createJob = async (data: any) => {
  const res = await api.post("/jobs", data);
  return res.data;
};

export const getMyJobs = async () => {
  const res = await api.get("/jobs/my");
  return res.data;
};

export const deleteJob = async (jobId: string) => {
  const res = await api.delete(`/jobs/${jobId}`);
  return res.data;
};

export const updateJob = async (jobId: string, data: any) => {
  const res = await api.put(`/jobs/${jobId}`, data);
  return res.data;
};