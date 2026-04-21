// validation/validate.ts

import { Validator } from "./rules";

export const validateField = (value: any, rules: Validator[]) => {
  for (let rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
};

export const validateForm = (
  data: Record<string, any>,
  schema: Record<string, Validator[]>
) => {
  const errors: Record<string, string> = {};

  Object.keys(schema).forEach((key) => {
    const error = validateField(data[key], schema[key]);
    if (error) errors[key] = error;
  });

  return errors;
};