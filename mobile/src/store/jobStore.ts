import { create } from "zustand";
import { getMyJobs } from "../services/jobService";

// ✅ FULL JOB TYPE (matches your backend + old store)
type Job = {
  id: string; // 🔥 IMPORTANT: backend uses id, not jobId
  employerId?: string;

  title: string;
  domain: string;
  role: string;
  description?: string;
  skills?: string[];

  openings: number;

  salary: number;
  payment_frequency: string;
  benefits?: string;

  job_location: string;
  job_pincode: string;

  work_type: string;
  shift: string;
  duration?: string;

  employer_name: string;
  contact: string;

  eligibility?: string;
  terms?: string;
  verification?: string;

  latitude?: number;
  longitude?: number;

  created_at?: string;
  updated_at?: string;

  status?: "active" | "closed";
};

type JobState = {
  jobs: Job[];
  loading: boolean;
  error: string | null;

  fetchJobs: () => Promise<void>;
  setJobs: (jobs: Job[]) => void;
  clearJobs: () => void;
};

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  loading: false,
  error: null,

  setJobs: (jobs) => set({ jobs }),

  clearJobs: () => set({ jobs: [] }),

  fetchJobs: async () => {
    try {
      set({ loading: true, error: null });

      const res = await getMyJobs();

      // 🔥 Normalize response (important)
      const normalizedJobs = res.jobs.map((job: any) => ({
        ...job,
      }));

      set({
        jobs: normalizedJobs,
        loading: false,
      });
    } catch (error: any) {
      console.log("Job fetch error:", error);

      set({
        loading: false,
        error: "Failed to fetch jobs",
      });
    }
  },
}));