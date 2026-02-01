import React from "react";
import styles from "../../Styles/ZestTextbox.module.css";
import { IconEyeOpen } from "../IconEyeOpen";
import { IconEyeSlashed } from "../IconEyeSlashed";

interface PasswordToggleButtonProps {
  isPassword: boolean;
  isPasswordVisible: boolean;
  onToggle: () => void;
}

export const PasswordToggleButton: React.FC<PasswordToggleButtonProps> = ({
  isPassword,
  isPasswordVisible,
  onToggle,
}) => {
  if (!isPassword) return null;

  return (
    <div className={styles.passwordToggle} onClick={onToggle}>
      <div className={styles.tooltip}>
        {isPasswordVisible ? "Hide password" : "Show password"}
      </div>
      {isPasswordVisible ? (
        <IconEyeOpen className={styles.eyeIcon} />
      ) : (
        <IconEyeSlashed className={styles.eyeIcon} />
      )}
    </div>
  );
};
