import {
  required,
  minLength,
  maxLength,
  regex,
  pincodeRules,
  locationRules,
  businessNameRules,
} from "./rules";
import { Validator } from "./rules";

// STEP 1
export const step1Schema: Record<string, Validator[]> = {
  title: [
    required("Job title is required"),
    minLength(3),
    maxLength(50),
  ],
  domain: [required("Domain is required")],
  role: [required("Role is required")],
  description: [maxLength(500)],
  skills: [maxLength(200)],
  openings: [
    (v) => (v <= 0 ? "At least 1 opening required" : null),
  ],
};

// STEP 2
export const step2Schema: Record<string, Validator[]> = {
  salary: [
    (v) => (v <= 0 ? "Salary must be greater than 0" : null),
  ],
  paymentFrequency: [required("Select payment frequency")],
  benefits: [maxLength(200)],
};

// STEP 3
export const step3Schema: Record<string, Validator[]> = {
  jobLocation: locationRules,
  jobPincode: pincodeRules,
  workType: [required("Select work type")],
  shift: [required("Select shift")],
  duration: [maxLength(50)],
};

// STEP 4
export const step4Schema: Record<string, Validator[]> = {
  employerName: businessNameRules,
  contact: [
    required("Contact is required"),
    regex(/^[0-9]{10}$/, "Enter valid 10-digit number"),
  ],
  eligibility: [maxLength(100)],
  terms: [maxLength(300)],
  verification: [maxLength(200)],
};