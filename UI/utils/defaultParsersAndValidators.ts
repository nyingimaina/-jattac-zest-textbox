import { InputParser, InputValidator, HtmlInputType } from "../types";

export const defaultNumberParser: InputParser<number> = (value: string, inputType?: HtmlInputType) => {
  if (inputType !== "number" && inputType !== "tel") {
    // If not a number type, don't parse as number
    return undefined;
  }
  const parsed = parseFloat(value);
  return isNaN(parsed) ? undefined : parsed;
};

export const defaultNumberValidator: InputValidator<number> = (value: number | undefined, inputType?: HtmlInputType) => {
  if (inputType !== "number" && inputType !== "tel") {
    // If not a number type, always consider valid for this validator
    return true;
  }
  if (value === undefined) {
    return "Invalid number format.";
  }
  return true;
};

// You can add more default parsers/validators here for other types like 'email', 'date', etc.