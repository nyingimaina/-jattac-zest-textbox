import React from "react";
import styles from "../../Styles/ZestTextbox.module.css";

interface ProgressBarProps {
  showProgressBar: boolean;
  showCounter: boolean;
  charPercentage: number;
  counterColorClass: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  showProgressBar,
  showCounter,
  charPercentage,
  counterColorClass,
}) => {
  if (!showProgressBar || !showCounter) return null;

  return (
    <div className={styles.progressBarContainer}>
      <div
        className={`${styles.progressBar} ${counterColorClass}`}
        style={{ width: `${charPercentage}%` }}
      />
    </div>
  );
};
