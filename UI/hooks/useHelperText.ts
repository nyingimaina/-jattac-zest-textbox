import { useState, useEffect, ReactNode } from "react";
import { HelperTextConfig, ZestContext, ZestTextboxProps } from "../types";

export const useHelperText = <T>(
  value: string,
  parsedValue: T | undefined,
  props: ZestTextboxProps<T>,
  helperTextConfig: HelperTextConfig | undefined
) => {
  const [helperTextNode, setHelperTextNode] = useState<ReactNode>(null);

  useEffect(() => {
    if (!helperTextConfig) {
      setHelperTextNode(null);
      return;
    }

    const context: ZestContext<T> = { value, parsedValue, props };

    const formatted = helperTextConfig.formatter
      ? helperTextConfig.formatter(context)
      : value; // Fallback to raw value if no formatter

    const finalNode = helperTextConfig.templater
      ? helperTextConfig.templater(formatted, context)
      : formatted;

    setHelperTextNode(finalNode);
  }, [value, parsedValue, props, helperTextConfig]);

  return helperTextNode;
};
