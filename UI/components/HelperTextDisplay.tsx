import React, { ReactNode } from "react";
import styles from "../../Styles/ZestTextbox.module.css";

interface HelperTextDisplayProps {
  helperTextNode: ReactNode;
  className?: string;
  positioning?: "reserved" | "absolute";
}

export const HelperTextDisplay: React.FC<HelperTextDisplayProps> = ({
  helperTextNode,
  className,
  positioning = "absolute", // Default to "absolute" as requested
}) => {
  if (!helperTextNode) {
    // If no helper text, but positioning is 'reserved', render an empty div
    // to maintain space and prevent layout shifts.
    if (positioning === "reserved") {
      return (
        <div
          className={`${styles.helperText} ${styles.reservedSpace} ${className || ""}`}
        />
      );
    }
    return null; // For 'absolute' positioning, return null if no text
  }

  return (
    <div
      className={`${styles.helperText} ${className || ""} ${styles[positioning]}`}
    >
      {helperTextNode}
    </div>
  );
};
