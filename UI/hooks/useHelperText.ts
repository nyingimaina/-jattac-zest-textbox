import { useState, useEffect, ReactNode } from "react";
import { HelperTextConfig, ZestContext, ZestTextboxProps } from "../types";

export const useHelperText = <T>(
  value: string,
  parsedValue: T | undefined,
  props: ZestTextboxProps<T>,
  helperTextConfig: HelperTextConfig | undefined
) => {
  const [helperTextNode, setHelperTextNode] = useState<ReactNode>(null);
  const { type, maxLength } = props;
  const { formatter, templater } = helperTextConfig || {};

  useEffect(() => {
    if (!helperTextConfig) {
      setHelperTextNode(null);
      return;
    }

    const context: ZestContext<T> = { value, parsedValue, props };

    const formatted = formatter
      ? formatter(context)
      : value; // Fallback to raw value if no formatter

    const finalNode = templater
      ? templater(formatted, context)
      : formatted;

    setHelperTextNode(finalNode);
  }, [value, parsedValue, type, maxLength, formatter, templater, helperTextConfig]);

  return helperTextNode;
};
