import { create } from "zustand";
//import uuid from "react-native-uuid";

export type FileType = {
  uri: string;
  name: string;
  size: number;
};


type Employer = {
  employerId: string;

  profileImage: string;
  name: string;
  gender: string;
  business: string;
  location: string;
  pincode: string;
  email: string;
  noEmail: boolean;

  businessLinks: string[];
  businessProofs: FileType[];

  createdAt: string;
  updatedAt?: string;
};

type EmployerState = {
  resetJobForm: () => void;
  clearProfile: () => void;
  // 👤 Employer Profile
  employerId: string;
  profileImage: string;
  name: string;
  gender: string;
  business: string;
  location: string;
  pincode: string;
  email: string;
  phone: string;
  noEmail: boolean;
  businessLinks: string[]; // website / instagram / youtube
  businessProofs: FileType[];

  createdAt?: string;
  updatedAt?: string;

  // 🧾 Job Form Fields
  title: string;
  //category: string;
  domain: string
  role: string  
  description: string;
  skills: string;
  openings: number;
  salary: number;
  paymentFrequency: string;
  benefits: string;
  jobLocation: string;
  jobPincode: string;
  workType: string;
  shift: string;
  duration: string;
  employerName: string;
  contact: string;
  eligibility: string;
  terms: string;
  verification: string;
  isFirstTimeFlow: boolean;


  // 👤 Employer setters
  setProfileImage: (uri: string) => void;
  setName: (val: string) => void;
  setGender: (val: string) => void;
  setBusiness: (val: string) => void;
  setLocation: (val: string) => void;
  setPincode: (val: string) => void;
  setEmail: (val: string) => void;
  setNoEmail: (val: boolean) => void;
  setBusinessLinks: (links: string[]) => void;
  setBusinessProofs: (files: FileType[]) => void;

  // 🧾 Job setters
  setTitle: (val: string) => void;
  //setCategory: (val: string) => void;
  setDomain: (val: string) => void;
  setRole: (val: string) => void;
  setDescription: (val: string) => void;
  setSkills: (val: string) => void;
  setOpenings: (val: number) => void;
  setSalary: (val: number) => void;
  setPaymentFrequency: (val: string) => void;
  setBenefits: (val: string) => void;
  setJobLocation: (val: string) => void;
  setJobPincode: (val: string) => void;
  setWorkType: (val: string) => void;
  setShift: (val: string) => void;
  setDuration: (val: string) => void;
  setEmployerName: (val: string) => void;
  setContact: (val: string) => void;
  setEligibility: (val: string) => void;
  setTerms: (val: string) => void;
  setVerification: (val: string) => void;
  setFirstTimeFlow: (value: boolean) => void;

  setProfileFromBackend: (data: any) => void;


};



//store
export const useEmployerStore = create<EmployerState>((set, get) => ({
  // 👤 Employer Profile
  //employerId: Date.now().toString(), // temp local id
  employerId: "",
  profileImage: "",
  name: "",
  gender: "",
  business: "",
  location: "",
  pincode: "",
  email: "",
  phone: "",
  noEmail: false,
  businessLinks: [],
  businessProofs: [],

  // 🧾 Job Form
  title: "",
  //category: "",
  domain: "",
  role: "",
  description: "",
  skills: "",
  openings: 0,
  salary: 0,
  paymentFrequency: "",
  benefits: "",
  jobLocation: "",
  jobPincode: "",
  workType: "",
  shift: "",
  duration: "",
  employerName: "",
  contact: "",
  eligibility: "",
  terms: "",
  verification: "",
  isFirstTimeFlow: false,


  // 👤 Employer setters
  setProfileImage: (uri) => set({ profileImage: uri }),
  setName: (val) => set({ name: val }),
  setGender: (val) => set({ gender: val }),
  setBusiness: (val) => set({ business: val }),
  setLocation: (val) => set({ location: val }),
  setPincode: (val) => set({ pincode: val }),
  setEmail: (val) => set({ email: val }),
  setNoEmail: (val) => set({ noEmail: val }),
  setBusinessLinks: (links) => set({ businessLinks: links }),
  setBusinessProofs: (files) => set({ businessProofs: files }),

  clearProfile: () =>
  set({
    profileImage: "",
    name: "",
    gender: "",
    business: "",
    location: "",
    pincode: "",
    email: "",
    phone: "",
    noEmail: false,
    businessProofs: [],
  }),

  // 🧾 Job setters
  setTitle: (val) => set({ title: val }),
  setDomain: (val: string) => set({ domain: val }),
  setRole: (val: string) => set({ role: val }),
  setDescription: (val) => set({ description: val }),
  setSkills: (val) => set({ skills: val }),
  setOpenings: (val) => set({ openings: val }),
  setSalary: (val) => set({ salary: val }),
  setPaymentFrequency: (val) => set({ paymentFrequency: val }),
  setBenefits: (val) => set({ benefits: val }),
  setJobLocation: (val) => set({ jobLocation: val }),
  setJobPincode: (val) => set({ jobPincode: val }),
  setWorkType: (val) => set({ workType: val }),
  setShift: (val) => set({ shift: val }),
  setDuration: (val) => set({ duration: val }),
  setEmployerName: (val) => set({ employerName: val }),
  setContact: (val) => set({ contact: val }),
  setEligibility: (val) => set({ eligibility: val }),
  setTerms: (val) => set({ terms: val }),
  setVerification: (val) => set({ verification: val }),
  setFirstTimeFlow: (value) => set({ isFirstTimeFlow: value }),


  setProfileFromBackend: (data) =>
  set({
    name: data.full_name || "",
    profileImage: data.profile_image_url || "",
    gender: data.gender
      ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1)
      : "",
    business: data.business_name || "",
    location: data.business_location || "",
    pincode: data.pincode || "",
    email: data.business_email || "",
    phone: data.phone_number || "",
    noEmail: !data.has_business_email,
    businessProofs: (data.documents || []).map((url: string, index: number) => ({
      uri: url,
      name: `doc_${index}.jpg`,
      size: 1,
    })),
  }),



  resetJobForm: () =>
    set({
      title: "",
      //category: "",
      domain: "",
      role: "",
      description: "",
      skills: "",
      openings: 0,
      salary: 0,
      paymentFrequency: "",
      benefits: "",
      jobLocation: "",
      jobPincode: "",
      workType: "",
      shift: "",
      duration: "",
      employerName: "",
      contact: "",
      eligibility: "",
      terms: "",
      verification: "",
    }),


})); 