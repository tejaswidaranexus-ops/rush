import api from "./api";

type PreferencesPayload = {
  job_type: string[];          // ["full-time"]
  job_positions: string[];     // ["driver", "plumber"]
  expected_salary: number;     // 15000
  preferred_cities: string[];  // ["Hyderabad"]
};

export const savePreferences = async (data: PreferencesPayload) => {
  try {
    const res = await api.post("/jobseeker/preferences", data);

    return res.data;
  } catch (error: any) {
    console.log("savePreferences error:", error?.response?.data || error.message);
    throw error;
  }
};