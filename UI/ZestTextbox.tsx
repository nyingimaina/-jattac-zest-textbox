import React, { useState, useEffect } from "react";
import styles from "../Styles/ZestTextbox.module.css";
import { IconEyeOpen } from "./IconEyeOpen";
import { IconEyeSlashed } from "./IconEyeSlashed";

export type ZestTextboxSize = "sm" | "md" | "lg";

type SharedProps = {
  zSize?: ZestTextboxSize;
  stretch?: boolean;
  className?: string;
  maxLength?: number;
  showProgressBar?: boolean;
  animatedCounter?: boolean;
  theme?: "light" | "dark" | "system";
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
    isMultiline?: false;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  };

type TextareaOnlyProps = SharedProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
    isMultiline: true;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  };

type ZestTextboxProps = InputOnlyProps | TextareaOnlyProps;

export const ZestTextbox: React.FC<ZestTextboxProps> = (props) => {
  const {
    zSize = "md",
    stretch: fullWidth = false,
    className = "",
    maxLength,
    onChange,
    type,
    showProgressBar = false,
    animatedCounter = false,
    theme = "system",
    ...rest
  } = props;

  const [value, setValue] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // === Advanced Theme Control ===
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
    if (maxLength !== undefined && e.target.value.length > maxLength) return;

    setValue(e.target.value);

    if (onChange) onChange(e as never); // cast because it could be input or textarea
  };

  const isPassword = type === "password";
  const inputType = isPassword && isPasswordVisible ? "text" : type;

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
      {"isMultiline" in props && props.isMultiline ? (
        <textarea
          {...(commonProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          {...(commonProps as React.InputHTMLAttributes<HTMLInputElement>)}
        />
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
            <IconEyeOpen
              className={`${styles.eyeIcon} ${isPasswordVisible ? styles.rotate : ""}`}
            />
          ) : (
            <IconEyeSlashed
              className={`${styles.eyeIcon} ${!isPasswordVisible ? styles.rotate : ""}`}
            />
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
