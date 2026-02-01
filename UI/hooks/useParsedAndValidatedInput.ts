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