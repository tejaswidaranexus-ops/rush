// validation/jobseeker.ts

import { fullNameRules, locationRules, required, pincodeRules } from "./rules";

export const jobseekerSchema = {
  name: fullNameRules,
  location: locationRules,
  pincode: pincodeRules,

  gender: [required("Gender is required")],
  dob: [required("Date of birth is required")],
  education: [required("Education is required")],
  experience: [required("Experience is required")],
};