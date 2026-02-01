import { useState, useEffect, ReactNode } from "react";
import { HelperTextConfig } from "../types";

export const useHelperText = (
  value: string,
  helperTextConfig: HelperTextConfig | undefined
) => {
  const [helperTextNode, setHelperTextNode] = useState<ReactNode>(null);

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

  return helperTextNode;
};
