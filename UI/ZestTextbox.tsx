import React, { useState } from "react";
import styles from "../Styles/ZestTextbox.module.css";
import { IconEyeOpen } from "./IconEyeOpen";
import { IconEyeSlashed } from "./IconEyeSlashed";

import { ZestTextboxSize, HelperTextConfig, ZestProps } from "./types";

type SharedProps = {
  /**
   * An object containing all custom configurations and behaviors specific to the ZestTextbox component.
   * This encapsulates all non-native HTML input/textarea props for better discoverability and DX.
   * @see ZestProps
   */
  zest?: ZestProps;
  /**
   * A custom CSS class to apply to the main textbox element.
   */
  className?: string;
  /**
   * The maximum number of characters allowed in the input.
   * Enables the character counter.
   */
  maxLength?: number;
  /**
   * The type of the input element. All standard HTML input types are supported.
   * Special handling is applied for `password` and `number`.
   * @default 'text'
   */
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "color"
    | "date"
    | "datetime-local"
    | "month"
    | "time"
    | "week";
};

type InputOnlyProps = SharedProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> & {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  };

type TextareaOnlyProps = SharedProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  };

type ZestTextboxProps = InputOnlyProps | TextareaOnlyProps;

import { filterNumericInput } from "./utils/numericInputFilter";
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

const ZestTextbox: React.FC<ZestTextboxProps> = (props) => {
  const {
    className = "",
    maxLength,
    onChange,
    type,
    zest, // Destructure the new zest prop
    ...rest
  } = props;

  const resolvedZestProps = useZestTextboxConfig(zest);
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
  } = resolvedZestProps;

  const [value, setValue] = useState("");

  const isDark = useThemeDetector(theme);
  const isPassword = type === "password";
  const { isPasswordVisible, togglePasswordVisibility } = usePasswordVisibility(isPassword);
  const { currentLength, charPercentage, counterColorClass, showCounter } = useCharacterCounter(value, maxLength, animatedCounter);

  const {
    parsedValue,
    isValid,
    validationMessage,
  } = useParsedAndValidatedInput({
    rawValue: value,
    parser: parser,
    validator: validator,
    onParsedAndValidatedChange: onTextChanged,
  });

  // Prioritize validation message over regular helper text
  const finalHelperTextNode = validationMessage ? (
    <span style={{ color: "red" }}>{validationMessage}</span>
  ) : useHelperText(value, helperTextConfig);


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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newValue = e.target.value;

    const isNumeric = type === "number" || type === "tel";
    if (isNumeric) {
      newValue = filterNumericInput(newValue);
    }

    if (maxLength !== undefined && newValue.length > maxLength) return;

    setValue(newValue);

    if (onChange) onChange(e as never);
    // onTextChanged is now handled by useParsedAndValidatedInput
  };

  const isNumeric = type === "number" || type === "tel";
  const inputType = isPassword && isPasswordVisible ? "text" : isNumeric ? "tel" : type;

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