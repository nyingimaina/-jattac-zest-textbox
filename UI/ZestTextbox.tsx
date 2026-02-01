import React, { useState } from "react";
import styles from "../Styles/ZestTextbox.module.css";
import { IconEyeOpen } from "./IconEyeOpen";
import { IconEyeSlashed } from "./IconEyeSlashed";

import { ZestTextboxSize, HelperTextConfig, ZestProps, HtmlInputType, ZestTextboxProps } from "./types";

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

const ZestTextbox = <T = string>(props: ZestTextboxProps<T>) => {
  const {
    className = "",
    maxLength,
    onChange,
    type,
    zest, // Destructure the new zest prop
    ...rest
  } = props;

  // Debugging: Log ZestTextbox props
  console.log("ZestTextbox Props:", { className, maxLength, type, zest, rest });


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
  } = resolvedZestProps;

  // Debugging: Log resolvedZestProps
  console.log("ZestTextbox Resolved Zest Props:", resolvedZestProps);


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
    inputType: type, // Pass the type prop here
    parser: parser,
    validator: validator,
    onParsedAndValidatedChange: onTextChanged,
  });

  // Debugging: Log parsed and validated input
  console.log("ZestTextbox Parsed/Validated:", { parsedValue, isValid, validationMessage });


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

    // Debugging: Log new value from input change
    console.log("ZestTextbox handleInputChange: raw newValue", newValue);


    const isNumeric = type === "number" || type === "tel";
    if (isNumeric) {
      newValue = filterNumericInput(newValue);
      // Debugging: Log newValue after numeric filter
      console.log("ZestTextbox handleInputChange: newValue after numeric filter", newValue);
    }

    if (maxLength !== undefined && newValue.length > maxLength) {
      console.log("ZestTextbox handleInputChange: maxLength exceeded, not updating value");
      return;
    }

    setValue(newValue);
    console.log("ZestTextbox handleInputChange: setValue to", newValue);


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