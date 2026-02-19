import React, { useState, useCallback } from "react";
import styles from "../Styles/ZestTextbox.module.css";
import { IconEyeOpen } from "./IconEyeOpen";
import { IconEyeSlashed } from "./IconEyeSlashed";

import { ZestTextboxSize, HelperTextConfig, ZestProps, HtmlInputType, ZestTextboxProps, InputParser, InputValidator } from "./types";

import { filterNumericInput } from "./utils/numericInputFilter";
import { defaultNumberParser, defaultNumberValidator } from "./utils/defaultParsersAndValidators";
import { useThemeDetector } from "./hooks/useThemeDetector";
import { usePasswordVisibility } from "./hooks/usePasswordVisibility";
import { useCharacterCounter } from "./hooks/useCharacterCounter";
import { useHelperText } from "./hooks/useHelperText";
import { PasswordToggleButton } from "./components/PasswordToggleButton";
import { CharacterCounter } from "./components/CharacterCounter";
import { ProgressBar } from "./components/ProgressBar";
import { HelperTextDisplay } from "./components/HelperTextDisplay";
import { useZestTextboxConfig } from "./hooks/useZestTextboxConfig";
import { useParsedAndValidatedInput } from "./hooks/useParsedAndValidatedInput";

// ... other imports

const ZestTextbox = <T = string>(props: ZestTextboxProps<T>) => {
  const {
    className = "",
    maxLength,
    onChange,
    type,
    zest, // Destructure the new zest prop
    ...rest
  } = props;

  const resolvedZestProps = useZestTextboxConfig(zest, type);
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
  } = resolvedZestProps;

  const [value, setValue] = useState("");

  const isDark = useThemeDetector(theme);
  const isPassword = type === "password";
  const { isPasswordVisible, togglePasswordVisibility } = usePasswordVisibility(isPassword);
  const { currentLength, charPercentage, counterColorClass, showCounter } = useCharacterCounter(value, maxLength, animatedCounter);

  const isNumericInputType = type === "number" || type === "currency" || type === "percentage";

  const parserToUse = isNumericInputType && !parser ? (defaultNumberParser as InputParser<T>) : parser;
  const validatorToUse = isNumericInputType && !validator ? (defaultNumberValidator as InputValidator<T>) : validator;

  const {
    parsedValue,
    isValid,
    validationMessage,
  } = useParsedAndValidatedInput({
    rawValue: value,
    inputType: type, // Pass the type prop here
    parser: parserToUse,
    validator: validatorToUse,
    onParsedAndValidatedChange: onTextChanged,
  });

  // Prioritize validation message over regular helper text
  const helperTextNode = useHelperText(value, parsedValue, props, helperTextConfig);
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

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let newValue = e.target.value;

      const isNumeric = type === "number" || type === "tel" || type === "currency" || type === "percentage";
      if (isNumeric) {
        newValue = filterNumericInput(newValue);
      }

      if (maxLength !== undefined && newValue.length > maxLength) {
        return;
      }

      setValue(newValue);

      if (onChange) onChange(e as never);
      // onTextChanged is now handled by useParsedAndValidatedInput
    },
    [type, maxLength, onChange]
  );

  const inputType = isPassword && isPasswordVisible ? "text" : isNumericInputType ? "tel" : type; // Use isNumericInputType here

  const commonProps = {
    className: classList,
    maxLength,
    onChange: handleInputChange,
    value,
    type: inputType,
    ...rest,
  };

  return (
    <div className={styles.wrapper}>
      {isMultiline ? ( // Use isMultiline from zest
        <textarea
          {...(commonProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          {...(commonProps as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      <HelperTextDisplay
        helperTextNode={finalHelperTextNode}
        className={helperTextConfig?.className || ''}
        positioning={helperTextPositioning}
      />

      <CharacterCounter
        showCounter={showCounter}
        currentLength={currentLength}
        maxLength={maxLength}
        counterColorClass={counterColorClass}
      />

      <PasswordToggleButton
        isPassword={isPassword}
        isPasswordVisible={isPasswordVisible}
        onToggle={togglePasswordVisibility}
      />

      <ProgressBar
        showProgressBar={showProgressBar}
        showCounter={showCounter}
        charPercentage={charPercentage}
        counterColorClass={counterColorClass}
      />
    </div>
  );
};

export default ZestTextbox;