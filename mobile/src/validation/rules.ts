// validation/rules.ts

export type Validator = (value: any) => string | null;

export const required = (msg = "This field is required"): Validator => (v) =>
  v === null || v === undefined || String(v).trim().length === 0
    ? msg
    : null;

export const minLength = (min: number): Validator => (v) =>
  v && v.length < min ? `Minimum ${min} characters required` : null;

export const maxLength = (max: number): Validator => (v) =>
  v && v.length > max ? `Maximum ${max} characters allowed` : null;

export const regex = (pattern: RegExp, msg: string): Validator => (v) =>
  v && !pattern.test(v) ? msg : null;

// 🔥 your existing logic becomes combinations
export const fullNameRules: Validator[] = [
  required(),
  minLength(2),
  maxLength(50),
  regex(/^[A-Za-z ]+$/, "Only alphabets and spaces allowed"),
];

export const businessNameRules: Validator[] = [
  required(),
  minLength(2),
  maxLength(100),
  regex(/^[A-Za-z0-9 .&-]+$/, "Invalid characters used"),
];

export const locationRules: Validator[] = [
  required(),
  minLength(2),
  maxLength(100),
  regex(/^[A-Za-z0-9 ,]+$/, "Only letters, numbers, commas allowed"),
];

export const pincodeRules: Validator[] = [
  required("Pincode is required"),
  regex(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"),
];

export const emailRules: Validator[] = [
  required("Email is required"),
  minLength(5),
  maxLength(254),
  regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
];