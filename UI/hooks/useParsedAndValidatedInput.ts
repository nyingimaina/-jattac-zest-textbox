import { useState, useEffect, useCallback } from "react";
import { InputParser, InputValidator, HtmlInputType } from "../types";

interface UseParsedAndValidatedInputArgs<T> {
  rawValue: string;
  inputType?: HtmlInputType;
  parser: InputParser<T> | undefined;
  validator: InputValidator<T> | undefined;
  onParsedAndValidatedChange: ((value: T | undefined) => void) | undefined;
}

export const useParsedAndValidatedInput = <T>({
  rawValue,
  inputType,
  parser,
  validator,
  onParsedAndValidatedChange,
}: UseParsedAndValidatedInputArgs<T>) => {
  const [parsedValue, setParsedValue] = useState<T | undefined>(undefined);
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    // --- OPTION 2 IMPLEMENTATION ---
    // If no custom parser or validator is provided, and it's not a number type
    // where default parsers/validators would be injected,
    // then simply pass the raw value and bypass complex logic.
    // This assumes that if parser/validator are undefined, the consumer expects raw string.
    const isNumericType = inputType === "number" || inputType === "tel" || inputType === "currency" || inputType === "percentage";
    if (!parser && !validator && !isNumericType) {
      setParsedValue(rawValue as unknown as T); // Cast raw string to T
      setIsValid(true);
      setValidationMessage(undefined);
      if (onParsedAndValidatedChange) {
        onParsedAndValidatedChange(rawValue as unknown as T); // Pass raw string as T
      }
      return; // Bypass the rest of the useEffect logic
    }
    // --- END OPTION 2 IMPLEMENTATION ---

    let currentParsedValue: T | undefined = undefined;
    let currentIsValid = true;
    let currentValidationMessage: string | undefined = undefined;

    // 1. Parse the raw value
    if (parser) {
      currentParsedValue = parser(rawValue, inputType);
    } else {
      currentParsedValue = rawValue as unknown as T;
    }

    // 2. Validate the parsed value
    if (typeof validator === "function") {
      const validationResult = validator(currentParsedValue, inputType);
      if (typeof validationResult === "string") {
        currentIsValid = false;
        currentValidationMessage = validationResult;
      } else {
        currentIsValid = validationResult;
        if (!currentIsValid) {
          currentValidationMessage = "Invalid input.";
        }
      }
    }


    setParsedValue(currentParsedValue);
    setIsValid(currentIsValid);
    setValidationMessage(currentValidationMessage);

    if (onParsedAndValidatedChange && currentIsValid) {
      onParsedAndValidatedChange(currentParsedValue);
    }
  }, [rawValue, inputType, parser, validator, onParsedAndValidatedChange]);

  return { parsedValue, isValid, validationMessage };
};
