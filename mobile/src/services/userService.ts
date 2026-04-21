import api from "./api";

export const getMe = async () => {
  const res = await api.get("/user/me");
  return res.data;
};

export const selectRole = async (role: "jobseeker" | "employer") => {
  const res = await api.post("/auth/select-role", { role });
  return res.data;
};