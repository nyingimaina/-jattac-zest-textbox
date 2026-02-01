import React from "react";
import styles from "../../Styles/ZestTextbox.module.css";

interface CharacterCounterProps {
  showCounter: boolean;
  currentLength: number;
  maxLength: number | undefined;
  counterColorClass: string;
}

export const CharacterCounter: React.FC<CharacterCounterProps> = ({
  showCounter,
  currentLength,
  maxLength,
  counterColorClass,
}) => {
  if (!showCounter) return null;

  return (
    <div className={`${styles.counter} ${counterColorClass}`}>
      {currentLength} / {maxLength}
    </div>
  );
};
