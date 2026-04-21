import { create } from "zustand";
//import uuid from "react-native-uuid";

//Type
type JobSeeker = {
  jobSeekerId: string;

  profileImage: string;
  name: string;
  gender: string;
  dob: string;
  location: string;
  pincode: number;

  education: string;
  experience: number;

  city: string;
  role: string;

  // UG
  institute: string;
  degree: string;
  specialization: string;
  startYear: number;
  endYear: number;

  // PG
  pgInstitute?: string;
  pgDegree?: string;
  pgSpecialization?: string;
  pgStartYear?: number;
  pgEndYear?: number;

  // Preferences
  jobType: string;
  salary: number;
  jobPosition: string[];
  selectedCities: string[];

  // Verification
  aadhaarNumber: string;
  aadhaarFile: string;
  resume: string;

  createdAt: string;
  updatedAt?: string;
};

type JobSeekerState = {
  jobSeekerId: string;

  profileImage: string;
  name: string;
  gender: string;
  dob: string;
  location: string;
  pincode: number;
  education: string;
  experience: number;
  city: string;
  role: string;

  // UG details
  institute: string;
  degree: string;
  specialization: string;
  startYear: number;
  endYear: number;

  // PG details (for Master's)
  pgInstitute: string;
  pgDegree: string;
  pgSpecialization: string;
  pgStartYear: number;
  pgEndYear: number;

  // Job preference fields
  jobType: string;
  //workType: string;
  salary: number;
  jobPosition: string[];
  selectedCities: string[];


    // Verification
  aadhaarNumber: string;
  aadhaarFile: string,
  resume: string;

  createdAt?: string;
  updatedAt?: string;



  //SETTER
  setProfileImage: (uri: string) => void;
  setName: (val: string) => void;
  setGender: (val: string) => void;
  setDob: (val: string) => void;
  setLocation: (val: string) => void;
  setPincode: (val: number) => void;
  setEducation: (val: string) => void;
  setExperience: (val: number) => void;
  setCity: (val: string) => void;
  setRole: (val: string) => void;

  setInstitute: (val: string) => void;
  setDegree: (val: string) => void;
  setSpecialization: (val: string) => void;
  setStartYear: (val: number) => void;
  setEndYear: (val: number) => void;

  setPgInstitute: (val: string) => void;
  setPgDegree: (val: string) => void;
  setPgSpecialization: (val: string) => void;
  setPgStartYear: (val: number) => void;
  setPgEndYear: (val: number) => void;

  // Actions
  setJobType: (val: string) => void;
  //setWorkType: (val: string) => void;
  setSalary: (val: number) => void;
  setJobPosition: (val: string[]) => void;
  setSelectedCities: (val: string[]) => void;

  setAadhaarNumber: (val: string) => void;
  setAadhaarFile: (val: string) => void;
  setResume: (val: string) => void;

  // stored profile
  profile?: JobSeeker;

  // actions
  saveProfile: () => void;
  updateProfile: (updated: Partial<JobSeeker>) => void;
  deleteProfile: () => void;

};

export const useJobSeekerStore = create<JobSeekerState>((set, get) => ({

  //STATE
  jobSeekerId: "", //when backend ready - set({ jobSeekerId: response.id });

  profileImage: "",
  name: "",
  gender: "",
  dob: "",
  location: "",
  pincode: 0,
  education: "",
  experience: 0,
  city: "",
  role: "",

  institute: "",
  degree: "",
  specialization: "",
  startYear: 0,
  endYear: 0,

  pgInstitute: "",
  pgDegree: "",
  pgSpecialization: "",
  pgStartYear: 0,
  pgEndYear: 0,

  jobType: "",
  //workType: "",
  salary: 0,
  jobPosition: [],
  selectedCities: [],

  aadhaarNumber: "",
  aadhaarFile: "",
  resume: "", 



  // Actions
  setProfileImage: (uri) => set({ profileImage: uri }),
  setName: (val) => set({ name: val }),
  setGender: (val) => set({ gender: val }),
  setDob: (val) => set({ dob: val }),
  setLocation: (val) => set({ location: val }),
  setPincode: (val) => set({ pincode: val }),
  setEducation: (val) => set({ education: val }),
  setExperience: (val) => set({ experience: val }),
  setCity: (val) => set({ city: val }),
  setRole: (val) => set({ role: val }),

  setInstitute: (val) => set({ institute: val }),
  setDegree: (val) => set({ degree: val }),
  setSpecialization: (val) => set({ specialization: val }),
  setStartYear: (val) => set({ startYear: val }),
  setEndYear: (val) => set({ endYear: val }),

  setPgInstitute: (val) => set({ pgInstitute: val }),
  setPgDegree: (val) => set({ pgDegree: val }),
  setPgSpecialization: (val) => set({ pgSpecialization: val }),
  setPgStartYear: (val) => set({ pgStartYear: val }),
  setPgEndYear: (val) => set({ pgEndYear: val }),

  setJobType: (val) => set({ jobType: val }),
  //setWorkType: (val) => set({ workType: val }),
  setSalary: (val) => set({ salary: val }),
  setJobPosition: (val) => set({ jobPosition: val }),
  setSelectedCities: (val) => set({ selectedCities: val }),

  setAadhaarNumber: (val) => set({ aadhaarNumber: val }),
  setAadhaarFile: (val) => set({ aadhaarFile: val }),
  setResume: (val) => set({ resume: val }),

  // 🛠 SAVE PROFILE
  saveProfile: () => {
    const state = get();
    const now = new Date().toISOString();

    const profile: JobSeeker = {
      jobSeekerId: state.jobSeekerId,
      profileImage: state.profileImage || "",
      name: state.name,
      gender: state.gender,
      dob: state.dob,
      location: state.location,
      pincode: state.pincode,
      education: state.education,
      experience: state.experience,
      city: state.city,
      role: state.role,
      institute: state.institute,
      degree: state.degree,
      specialization: state.specialization,
      startYear: state.startYear,
      endYear: state.endYear,
      pgInstitute: state.pgInstitute || undefined,
      pgDegree: state.pgDegree || undefined,
      pgSpecialization: state.pgSpecialization || undefined,
      pgStartYear: state.pgStartYear || undefined,
      pgEndYear: state.pgEndYear || undefined,
      jobType: state.jobType,
      salary: state.salary,
      jobPosition: state.jobPosition,
      selectedCities: state.selectedCities,
      aadhaarNumber: state.aadhaarNumber,
      aadhaarFile: state.aadhaarFile,
      resume: state.resume,
      createdAt: now,
      updatedAt: now,
    };

    set({
      profile,
      createdAt: now,
      updatedAt: now,
    });
  },

  // ✏️ UPDATE PROFILE
  updateProfile: (updated) =>
    set(() => ({
      ...updated,
      updatedAt: new Date().toISOString(),
    })),

  // 🗑 DELETE PROFILE
  deleteProfile: () =>
    set({
      profileImage: "",
      name: "",
      gender: "",
      dob: "",
      location: "",
      pincode: 0,
      education: "",
      experience: 0,
      city: "",
      role: "",
      institute: "",
      degree: "",
      specialization: "",
      startYear: 0,
      endYear: 0,
      pgInstitute: "",
      pgDegree: "",
      pgSpecialization: "",
      pgStartYear: 0,
      pgEndYear: 0,
      jobType: "",
      salary: 0,
      jobPosition: [],
      selectedCities: [],
      aadhaarNumber: "",
      aadhaarFile: "",
      resume: "",
    }),
}));  