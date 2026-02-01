import { useState, useEffect, useCallback } from "react";
import { InputParser, InputValidator } from "../types";

interface UseParsedAndValidatedInputArgs<T> {
  rawValue: string;
  parser: InputParser<T> | undefined;
  validator: InputValidator<T> | undefined;
  // The onTextChanged callback should receive the parsed value
  onParsedAndValidatedChange: ((value: T | undefined) => void) | undefined;
}

export const useParsedAndValidatedInput = <T>({
  rawValue,
  parser,
  validator,
  onParsedAndValidatedChange,
}: UseParsedAndValidatedInputArgs<T>) => {
  const [parsedValue, setParsedValue] = useState<T | undefined>(undefined);
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    let currentParsedValue: T | undefined = undefined;
    let currentIsValid = true;
    let currentValidationMessage: string | undefined = undefined;

    // 1. Parse the raw value
    if (parser) {
      currentParsedValue = parser(rawValue);
    } else {
      // If no parser, treat rawValue as the parsed value (e.g., for text inputs)
      currentParsedValue = rawValue as unknown as T;
    }

    // 2. Validate the parsed value
    if (validator) {
      const validationResult = validator(currentParsedValue);
      if (typeof validationResult === "string") {
        currentIsValid = false;
        currentValidationMessage = validationResult;
      } else {
        currentIsValid = validationResult;
        if (!currentIsValid) {
          currentValidationMessage = "Invalid input."; // Generic message if validator returns false
        }
      }
    }

    setParsedValue(currentParsedValue);
    setIsValid(currentIsValid);
    setValidationMessage(currentValidationMessage);

    // 3. Call the consumer's callback with the parsed and validated value
    // Only call if a callback is provided and the input is valid
    if (onParsedAndValidatedChange && currentIsValid) {
      onParsedAndValidatedChange(currentParsedValue);
    }
  }, [rawValue, parser, validator, onParsedAndValidatedChange]);

  return { parsedValue, isValid, validationMessage };
};