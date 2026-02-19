import React from "react";
import styles from "../../Styles/ZestTextbox.module.css";
import { HelperTextDisplay } from "./HelperTextDisplay";
import { CharacterCounter } from "./CharacterCounter";
import { PasswordToggleButton } from "./PasswordToggleButton";
import { ProgressBar } from "./ProgressBar";
import { HelperTextConfig } from "../types";

interface ZestTextboxLayoutProps {
  isMultiline: boolean;
  commonProps: any;
  finalHelperTextNode: React.ReactNode;
  helperTextConfig: HelperTextConfig | undefined;
  helperTextPositioning: "reserved" | "absolute";
  showCounter: boolean;
  currentLength: number;
  maxLength: number | undefined;
  counterColorClass: string;
  isPassword: boolean;
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
  showProgressBar: boolean;
  charPercentage: number;
}

export const ZestTextboxLayout: React.FC<ZestTextboxLayoutProps> = ({
  isMultiline,
  commonProps,
  finalHelperTextNode,
  helperTextConfig,
  helperTextPositioning,
  showCounter,
  currentLength,
  maxLength,
  counterColorClass,
  isPassword,
  isPasswordVisible,
  togglePasswordVisibility,
  showProgressBar,
  charPercentage,
}) => {
  return (
    <div className={styles.wrapper}>
      {isMultiline ? (
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
