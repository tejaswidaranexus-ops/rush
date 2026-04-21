import { fullNameRules, businessNameRules, locationRules, pincodeRules, emailRules } from "./rules";


export const EmployerSchema = (noEmail: boolean) => ({
  name: fullNameRules,
  businessName: businessNameRules,
  location: locationRules,
  pincode: pincodeRules,
  email: noEmail ? [] : emailRules,
});