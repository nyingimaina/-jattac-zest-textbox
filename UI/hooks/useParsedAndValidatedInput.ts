import { useState, useEffect, useRef } from "react";
import { InputParser, InputValidator, HtmlInputType } from "../types";
import { deepEqual } from "../utils/deepEqual";

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

  // Stability Ref: ensure we always use the latest callback without re-triggering effects
  const callbackRef = useRef(onParsedAndValidatedChange);
  useEffect(() => {
    callbackRef.current = onParsedAndValidatedChange;
  }, [onParsedAndValidatedChange]);

  // Value-Change Guard: ensure we only notify the parent when the *parsed* value actually changes
  const lastReportedValueRef = useRef<T | undefined>(undefined);
  const isFirstRender = useRef(true);

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

  }, [rawValue, inputType, parser, validator]);

  // Separate Effect for notifying the parent. This ensures stability and avoids render cycle issues.
  useEffect(() => {
    // If the input is invalid, we report 'undefined' so the consumer knows the current state is invalid.
    const valueToReport = isValid ? parsedValue : undefined;

    // Skip the first render to avoid firing immediately on mount (unless specifically needed)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      lastReportedValueRef.current = valueToReport;
      return;
    }

    // Only fire if the value is actually different from the last one we reported
    if (!deepEqual(valueToReport, lastReportedValueRef.current)) {
      callbackRef.current?.(valueToReport);
      lastReportedValueRef.current = valueToReport;
    }
  }, [parsedValue, isValid]);

  return { parsedValue, isValid, validationMessage };
};
