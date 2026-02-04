import React, { ReactNode } from "react";
import styles from "../../Styles/ZestTextbox.module.css";

interface HelperTextDisplayProps {
  helperTextNode: ReactNode;
  className?: string;
}

export const HelperTextDisplay: React.FC<HelperTextDisplayProps> = ({
  helperTextNode,
  className,
}) => {
  if (!helperTextNode) return null;

  return (
    <div
      className={`${styles.helperText} ${className || ""}`}
    >
      {helperTextNode}
    </div>
  );
};
