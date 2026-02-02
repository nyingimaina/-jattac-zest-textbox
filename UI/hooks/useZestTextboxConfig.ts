import { useEffect, useState, useMemo } from "react";
import { ZestProps, ZestConfigValue, ZestTextboxSize, HelperTextConfig, ResolvedZestProps, InputParser, InputValidator, HtmlInputType } from "../types";
import { useZestTextboxConfig as useZestTextboxContext } from "../contexts/ZestTextboxConfigContext";
import { defaultNumberParser, defaultNumberValidator } from "../utils/defaultParsersAndValidators"; // Import defaults

// Helper function to resolve a ZestConfigValue
async function resolveZestConfigValue<V>(
  configValue: ZestConfigValue<V> | undefined,
  defaultValue: V,
  inputType?: HtmlInputType
): Promise<V> {
  if (configValue === undefined) {
    return defaultValue;
  }
  if (typeof configValue === "function") {
    const result = (configValue as (inputType?: HtmlInputType) => V | Promise<V>)(
      inputType
    );
    return result instanceof Promise ? await result : result;
  }
  return configValue;
}

const defaultResolvedZestProps = { // Removed explicit type here, will be inferred
  zSize: "md",
  stretch: false,
  showProgressBar: false,
  animatedCounter: false,
  theme: "system",
  isMultiline: false,
  onTextChanged: undefined,
  helperTextConfig: undefined,
  parser: undefined,
  validator: undefined,
};

export const useZestTextboxConfig = <T = string>(componentZestProps: ZestProps<T> | undefined, inputType?: HtmlInputType) => { // Made generic
  const { defaultZestProps: contextDefaultZestProps } = useZestTextboxContext<T>(); // Pass generic T

  const [resolvedZestProps, setResolvedZestProps] = useState<ResolvedZestProps<T>>(defaultResolvedZestProps as ResolvedZestProps<T>); // Cast to generic type

  // Memoize the merged props to avoid unnecessary re-renders
  const mergedZestProps = useMemo(() => {
    // Start with hardcoded defaults
    let currentMergedProps: ZestProps<T> = { ...defaultResolvedZestProps as ZestProps<T> }; // Cast

    // Apply context defaults
    currentMergedProps = { ...currentMergedProps, ...contextDefaultZestProps }; // No longer need cast here

    // Apply type-specific defaults if not already overridden by context
    if (
      inputType === "number" ||
      inputType === "currency" ||
      inputType === "percentage"
    ) {
      if (currentMergedProps.parser === undefined) {
        currentMergedProps.parser = defaultNumberParser as InputParser<T>; // Cast
      }
      if (currentMergedProps.validator === undefined) {
        currentMergedProps.validator = defaultNumberValidator as InputValidator<T>; // Cast
      }
    }

    // Apply component-level props (highest precedence)
    currentMergedProps = { ...currentMergedProps, ...componentZestProps };

    return currentMergedProps;
  }, [contextDefaultZestProps, componentZestProps, inputType]); // Added inputType to dependencies

  useEffect(() => {
    const resolveProps = async () => {
      const newResolvedProps: ResolvedZestProps<T> = { ...defaultResolvedZestProps as ResolvedZestProps<T> }; // Initialize with defaults and cast

      // Resolve each property that can be a ZestConfigValue
      newResolvedProps.zSize = await resolveZestConfigValue(
        mergedZestProps.zSize,
        (defaultResolvedZestProps.zSize as ZestTextboxSize),
        inputType
      );
      newResolvedProps.stretch = await resolveZestConfigValue(
        mergedZestProps.stretch,
        (defaultResolvedZestProps.stretch as boolean),
        inputType
      );
      newResolvedProps.showProgressBar = await resolveZestConfigValue(
        mergedZestProps.showProgressBar,
        (defaultResolvedZestProps.showProgressBar as boolean),
        inputType
      );
      newResolvedProps.animatedCounter = await resolveZestConfigValue(
        mergedZestProps.animatedCounter,
        (defaultResolvedZestProps.animatedCounter as boolean),
        inputType
      );
      newResolvedProps.theme = await resolveZestConfigValue(
        mergedZestProps.theme,
        (defaultResolvedZestProps.theme as "light" | "dark" | "system"),
        inputType
      );
      newResolvedProps.isMultiline = await resolveZestConfigValue(
        mergedZestProps.isMultiline,
        (defaultResolvedZestProps.isMultiline as boolean),
        inputType
      );
      // onTextChanged is no longer a ZestConfigValue, so it's directly assigned
      newResolvedProps.onTextChanged = mergedZestProps.onTextChanged;

      newResolvedProps.helperTextConfig = await resolveZestConfigValue(
        mergedZestProps.helperTextConfig,
        (defaultResolvedZestProps.helperTextConfig as HelperTextConfig | undefined),
        inputType
      );
      newResolvedProps.parser = await resolveZestConfigValue(
        mergedZestProps.parser,
        (defaultResolvedZestProps.parser as InputParser<T> | undefined),
        inputType
      );
      newResolvedProps.validator = await resolveZestConfigValue(
        mergedZestProps.validator,
        (defaultResolvedZestProps.validator as InputValidator<T> | undefined),
        inputType
      );

      setResolvedZestProps(newResolvedProps);
    };

    resolveProps();
  }, [mergedZestProps, inputType]); // Re-run effect if merged props change

  return resolvedZestProps;
};
