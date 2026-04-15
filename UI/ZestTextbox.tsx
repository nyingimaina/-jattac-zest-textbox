import React, { useState, useCallback, useEffect, useRef } from "react";
import styles from "../Styles/ZestTextbox.module.css";

import { ZestTextboxProps, InputParser, InputValidator } from "./types";

import { filterNumericInput } from "./utils/numericInputFilter";
import { applyCasing, adjustedCursorPos } from "./utils/casingUtils";
import { defaultNumberParser, defaultNumberValidator } from "./utils/defaultParsersAndValidators";
import { useThemeDetector } from "./hooks/useThemeDetector";
import { usePasswordVisibility } from "./hooks/usePasswordVisibility";
import { useCharacterCounter } from "./hooks/useCharacterCounter";
import { useHelperText } from "./hooks/useHelperText";
import { useZestTextboxConfig } from "./hooks/useZestTextboxConfig";
import { useParsedAndValidatedInput } from "./hooks/useParsedAndValidatedInput";
import { ZestTextboxLayout } from "./components/ZestTextboxLayout";

const ZestTextbox = <T = string>(props: ZestTextboxProps<T>) => {
  const {
    className = "",
    maxLength,
    onChange,
    type,
    zest, // Destructure the new zest prop
    value: propsValue,
    defaultValue,
    ...rest
  } = props as any;

  const resolvedZestProps = useZestTextboxConfig<T>(zest, type);
  const {
    zSize,
    stretch: fullWidth,
    showProgressBar,
    animatedCounter,
    theme,
    helperTextConfig,
    onTextChanged,
    isMultiline,
    parser,
    validator,
    helperTextPositioning,
    casingBehaviour,
  } = resolvedZestProps;

  const [value, setValue] = useState(propsValue ?? defaultValue ?? "");

  useEffect(() => {
    if (propsValue !== undefined) {
      setValue(propsValue);
    }
  }, [propsValue]);

  const isDark = useThemeDetector(theme);
  const isPassword = type === "password";
  const { isPasswordVisible, togglePasswordVisibility } = usePasswordVisibility(isPassword);
  const { currentLength, charPercentage, counterColorClass, showCounter } = useCharacterCounter(value, maxLength, animatedCounter);

  const isNumericInputType = type === "number" || type === "currency" || type === "percentage";

  const parserToUse = isNumericInputType && !parser ? (defaultNumberParser as unknown as InputParser<T>) : parser;
  const validatorToUse = isNumericInputType && !validator ? (defaultNumberValidator as unknown as InputValidator<T>) : validator;

  const {
    parsedValue,
    isValid,
    validationMessage,
  } = useParsedAndValidatedInput<T>({
    rawValue: value,
    inputType: type, // Pass the type prop here
    parser: parserToUse,
    validator: validatorToUse,
    onParsedAndValidatedChange: onTextChanged,
  });

  // Prioritize validation message over regular helper text
  const helperTextNode = useHelperText<T>(value, parsedValue, props, helperTextConfig);
  const finalHelperTextNode = validationMessage ? (
    <span style={{ color: "red" }}>{validationMessage}</span>
  ) : helperTextNode;


  const classList = [
    styles.textbox,
    styles[zSize],
    fullWidth ? styles.fullWidth : "",
    className,
    isDark ? styles.dark : "",
    !isValid ? styles.error : "", // Add error class if not valid
  ]
    .filter(Boolean)
    .join(" ");

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const pendingCursorRef = useRef<number | null>(null);

  // After a PascalCase transform (which removes spaces and shortens the string),
  // restore the cursor to the correct position once React has re-rendered.
  useEffect(() => {
    if (pendingCursorRef.current !== null && inputRef.current) {
      const pos = pendingCursorRef.current;
      pendingCursorRef.current = null;
      requestAnimationFrame(() => {
        inputRef.current?.setSelectionRange(pos, pos);
      });
    }
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let newValue = e.target.value;

      const isNumeric = type === "number" || type === "tel" || type === "currency" || type === "percentage";
      if (isNumeric) {
        newValue = filterNumericInput(newValue);
      }

      if (casingBehaviour) {
        const cursorPos = e.target.selectionStart ?? newValue.length;
        const transformed = applyCasing(newValue, casingBehaviour);
        if (casingBehaviour === "PascalCase" && transformed !== newValue) {
          // PascalCase removes spaces, shortening the string — compute new cursor position.
          pendingCursorRef.current = adjustedCursorPos(newValue, cursorPos);
        }
        newValue = transformed;
      }

      if (maxLength !== undefined && newValue.length > maxLength) {
        return;
      }

      setValue(newValue);

      if (onChange) onChange(e as never);
      // onTextChanged is now handled by useParsedAndValidatedInput
    },
    [type, maxLength, onChange, casingBehaviour]
  );

  const inputType = isPassword && isPasswordVisible ? "text" : isNumericInputType ? "tel" : type; // Use isNumericInputType here

  const commonProps = {
    ref: inputRef,
    className: classList,
    maxLength,
    onChange: handleInputChange,
    value,
    type: inputType,
    ...rest,
  };

  return (
    <ZestTextboxLayout
      isMultiline={isMultiline}
      commonProps={commonProps}
      finalHelperTextNode={finalHelperTextNode}
      helperTextConfig={helperTextConfig}
      helperTextPositioning={helperTextPositioning}
      showCounter={showCounter}
      currentLength={currentLength}
      maxLength={maxLength}
      counterColorClass={counterColorClass}
      isPassword={isPassword}
      isPasswordVisible={isPasswordVisible}
      togglePasswordVisibility={togglePasswordVisibility}
      showProgressBar={showProgressBar}
      charPercentage={charPercentage}
    />
  );
};

export default ZestTextbox;