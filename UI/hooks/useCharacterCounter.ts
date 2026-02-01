import { useMemo } from "react";
import styles from "../../Styles/ZestTextbox.module.css";

export const useCharacterCounter = (
  value: string,
  maxLength: number | undefined,
  animatedCounter: boolean
) => {
  const currentLength = value.length;
  const showCounter = typeof maxLength === "number";
  const charPercentage = showCounter ? (currentLength / maxLength) * 100 : 0;

  const counterColorClass = useMemo(() => {
    if (!animatedCounter || !showCounter) return "";

    if (charPercentage > 90) {
      return styles.counterOrange;
    } else if (charPercentage > 70) {
      return styles.counterYellow;
    }
    return "";
  }, [animatedCounter, showCounter, charPercentage]);

  return { currentLength, charPercentage, counterColorClass, showCounter };
};
