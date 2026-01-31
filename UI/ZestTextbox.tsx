import React, { useState, useEffect } from "react";
import styles from "../Styles/ZestTextbox.module.css";
import { IconEyeOpen } from "./IconEyeOpen";
import { IconEyeSlashed } from "./IconEyeSlashed";

export type ZestTextboxSize = "sm" | "md" | "lg";

export interface HelperTextConfig {
  /**
   * A function to process the raw input value into a new string.
   * Ideal for formatting operations like currency conversion or sanitization.
   * @param value The raw string value from the textbox.
   * @returns The processed string to be used by the templater or for default rendering.
   */
  formatter?: (value: string) => string;

  /**
   * An optional function for advanced rendering of the helper text.
   * It receives the processed string (from `formatter` or the raw value if no formatter is provided)
   * and should return a ReactNode. If not provided, the processed string
   * is rendered with default muted styling.
   * @param formattedValue The processed string.
   * @returns The ReactNode to be rendered as helper text.
   */
  templater?: (formattedValue: string) => React.ReactNode;

  /**
   * An optional CSS class to apply to the helper text container for custom styling.
   */
  className?: string;
}

export interface ZestProps {
  /**
   * An object to configure the dynamic helper text displayed below the input.
   * @see HelperTextConfig
   */
  helperTextConfig?: HelperTextConfig;
  /**
   * A callback that provides the raw string value of the input on every change.
   * This is a convenience prop to avoid using `event.target.value`.
   * @param value The current string value of the input.
   */
  onTextChanged?: (value: string) => void;
  /**
   * Sets the size of the textbox, affecting padding and font size.
   * @default 'md'
   */
  zSize?: ZestTextboxSize;
  /**
   * If `true`, the component will stretch to the full width of its container.
   * @default false
   */
  stretch?: boolean;
  /**
   * If `true`, a progress bar indicating character count vs. `maxLength` will be displayed.
   * Requires `maxLength` to be set.
   * @default false
   */
  showProgressBar?: boolean;
  /**
   * If `true`, the character counter will change color as it approaches the `maxLength`.
   * Requires `maxLength` to be set.
   * @default false
   */
  animatedCounter?: boolean;
  /**
   * Controls the component's color scheme.
   * `'system'` automatically detects the OS/browser preference.
   * @default 'system'
   */
  theme?: "light" | "dark" | "system";
  /**
   * If `true`, the component will render as a `<textarea>`.
   * If `false` or undefined, it renders as an `<input>`.
   * @default false
   */
  isMultiline?: boolean;
}

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

export const ZestTextbox: React.FC<ZestTextboxProps> = (props) => {
  const {
    className = "",
    maxLength,
    onChange,
    type,
    zest, // Destructure the new zest prop
    ...rest
  } = props;

  // Destructure custom props from zest, applying defaults if zest is undefined
  const {
    zSize = "md",
    stretch: fullWidth = false,
    showProgressBar = false,
    animatedCounter = false,
    theme = "system",
    helperTextConfig,
    onTextChanged,
    isMultiline = false, // Default for isMultiline
  } = zest || {}; // Provide empty object as fallback if zest is undefined

  const [value, setValue] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [helperTextNode, setHelperTextNode] = useState<React.ReactNode>(null);

  // Effect for Helper Text
  useEffect(() => {
    if (!helperTextConfig) {
      setHelperTextNode(null);
      return;
    }

    const formatted = helperTextConfig.formatter
      ? helperTextConfig.formatter(value)
      : value;

    const finalNode = helperTextConfig.templater
      ? helperTextConfig.templater(formatted)
      : formatted;

    setHelperTextNode(finalNode);
  }, [value, helperTextConfig]);

  // Effect for Theme Control
  useEffect(() => {
    if (theme === "dark") {
      setIsDark(true);
      return;
    }
    if (theme === "light") {
      setIsDark(false);
      return;
    }

    // System theme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setIsDark(mediaQuery.matches);

    handleChange(); // Set initial theme
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const classList = [
    styles.textbox,
    styles[zSize],
    fullWidth ? styles.fullWidth : "",
    className,
    isDark ? styles.dark : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newValue = e.target.value;

    if (isNumeric) {
      // Allow digits, a single leading hyphen, and a single decimal point
      const parts = newValue.split('.');
      let integerPart = parts[0].replace(/[^0-9-]/g, '');
      let decimalPart = parts.length > 1 ? '.' + parts[1].replace(/[^0-9]/g, '') : '';

      // Ensure only one leading hyphen
      if (integerPart.startsWith('-')) {
        integerPart = '-' + integerPart.substring(1).replace(/-/g, '');
      } else {
        integerPart = integerPart.replace(/-/g, '');
      }

      newValue = integerPart + decimalPart;

      // Prevent multiple decimal points
      if (newValue.indexOf('.') !== newValue.lastIndexOf('.')) {
        newValue = newValue.substring(0, newValue.lastIndexOf('.'));
      }
    }

    if (maxLength !== undefined && newValue.length > maxLength) return;

    setValue(newValue);

    if (onChange) onChange(e as never);
    if (onTextChanged) onTextChanged(newValue);
  };

  const isPassword = type === "password";
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

  const showCounter = typeof maxLength === "number";
  const charPercentage = showCounter ? (value.length / maxLength) * 100 : 0;

  const counterColorClass = animatedCounter
    ? charPercentage > 90
      ? styles.counterOrange
      : charPercentage > 70
      ? styles.counterYellow
      : ""
    : "";

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

      {helperTextNode && (
        <div
          key={value} // Force re-mount to trigger animation
          className={`${styles.helperText} ${helperTextConfig?.className || ''}`}
        >
          {helperTextNode}
        </div>
      )}

      {showCounter && (
        <div className={`${styles.counter} ${counterColorClass}`}>
          {value.length} / {maxLength}
        </div>
      )}

      {isPassword && (
        <div
          className={styles.passwordToggle}
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <div className={styles.tooltip}>
            {isPasswordVisible ? "Hide password" : "Show password"}
          </div>
          {isPasswordVisible ? (
            <IconEyeOpen className={styles.eyeIcon} />
          ) : (
            <IconEyeSlashed className={styles.eyeIcon} />
          )}
        </div>
      )}

      {showProgressBar && showCounter && (
        <div className={styles.progressBarContainer}>
          <div
            className={`${styles.progressBar} ${counterColorClass}`}
            style={{ width: `${charPercentage}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default ZestTextbox;