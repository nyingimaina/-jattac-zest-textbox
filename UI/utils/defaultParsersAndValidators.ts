import { InputParser, InputValidator } from "../types";

export const defaultNumberParser: InputParser<number> = (value: string) => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? undefined : parsed;
};

export const defaultNumberValidator: InputValidator<number> = (value: number | undefined) => {
  if (value === undefined) {
    return "Invalid number format.";
  }
  return true;
};

// You can add more default parsers/validators here for other types like 'email', 'date', etc.
