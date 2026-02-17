import { useEffect, useState, useMemo } from "react";
import { ZestProps, ZestConfigValue, ZestTextboxSize, HelperTextConfig, ResolvedZestProps, InputParser, InputValidator, HtmlInputType } from "../types";
import { useZestTextboxConfig as useZestTextboxContext } from "../contexts/ZestTextboxConfigContext";
import { defaultNumberParser, defaultNumberValidator } from "../utils/defaultParsersAndValidators"; // Import defaults
import { deepEqual } from "../utils/deepEqual"; // Import deepEqual utility

const ZEST_CONFIG_TIMEOUT = 2000; // 2 seconds

// Helper function to resolve a ZestConfigValue. This now ALWAYS returns a promise.
function resolveZestConfigValue<V>(
  configValue: ZestConfigValue<V> | undefined,
  defaultValue: V,
  inputType?: HtmlInputType
): Promise<V> {
  // Wrap the entire logic in a promise to handle all cases asynchronously
  return new Promise(resolve => {
    if (configValue === undefined) {
      resolve(defaultValue);
      return;
    }

    if (typeof configValue === "function") {
      try {
        const result = (configValue as (inputType?: HtmlInputType) => V | Promise<V>)(
          inputType
        );
        // If the result is a promise, chain it; otherwise, resolve with the sync result.
        // This ensures that even synchronous functions are handled in the promise chain.
        Promise.resolve(result).then(resolve);
      } catch (e) {
        // If a sync function throws an error, we can't recover, but this will be caught by the timeout.
        // The promise will just never resolve.
        console.error("ZestTextbox: Synchronous error in config function.", e);
      }
    } else {
      // It's a plain value
      resolve(configValue);
    }
  });
}

// Timeout wrapper for resolving config values
async function resolveWithTimeout<V>(
  promise: Promise<V>,
  timeout: number,
  propName: string,
  fallback: V
): Promise<V> {
  const timeoutPromise = new Promise<V>((_, reject) =>
    setTimeout(() => reject(new Error(`Timeout for prop '${propName}'`)), timeout)
  );

  try {
    return await Promise.race([promise, timeoutPromise]);
  } catch (error) {
    console.warn(
      `ZestTextbox: Configuration for prop '${propName}' timed out after ${timeout}ms and has fallen back to its default value.`
    );
    return fallback;
  }
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
  helperTextPositioning: "absolute", // Added default
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
      const timeout = ZEST_CONFIG_TIMEOUT;

      // Resolve each property that can be a ZestConfigValue
      newResolvedProps.zSize = await resolveWithTimeout(
        resolveZestConfigValue(mergedZestProps.zSize, defaultResolvedZestProps.zSize as ZestTextboxSize, inputType),
        timeout, 'zSize', defaultResolvedZestProps.zSize as ZestTextboxSize
      );
      newResolvedProps.stretch = await resolveWithTimeout(
        resolveZestConfigValue(mergedZestProps.stretch, defaultResolvedZestProps.stretch as boolean, inputType),
        timeout, 'stretch', defaultResolvedZestProps.stretch as boolean
      );
      newResolvedProps.showProgressBar = await resolveWithTimeout(
        resolveZestConfigValue(mergedZestProps.showProgressBar, defaultResolvedZestProps.showProgressBar as boolean, inputType),
        timeout, 'showProgressBar', defaultResolvedZestProps.showProgressBar as boolean
      );
      newResolvedProps.animatedCounter = await resolveWithTimeout(
        resolveZestConfigValue(mergedZestProps.animatedCounter, defaultResolvedZestProps.animatedCounter as boolean, inputType),
        timeout, 'animatedCounter', defaultResolvedZestProps.animatedCounter as boolean
      );
      newResolvedProps.theme = await resolveWithTimeout(
        resolveZestConfigValue(mergedZestProps.theme, defaultResolvedZestProps.theme as "light" | "dark" | "system", inputType),
        timeout, 'theme', defaultResolvedZestProps.theme as "light" | "dark" | "system"
      );
      newResolvedProps.isMultiline = await resolveWithTimeout(
        resolveZestConfigValue(mergedZestProps.isMultiline, defaultResolvedZestProps.isMultiline as boolean, inputType),
        timeout, 'isMultiline', defaultResolvedZestProps.isMultiline as boolean
      );
      // onTextChanged is no longer a ZestConfigValue, so it's directly assigned
      newResolvedProps.onTextChanged = mergedZestProps.onTextChanged;

      newResolvedProps.helperTextConfig = await resolveWithTimeout(
        resolveZestConfigValue(mergedZestProps.helperTextConfig, defaultResolvedZestProps.helperTextConfig as HelperTextConfig | undefined, inputType),
        timeout, 'helperTextConfig', defaultResolvedZestProps.helperTextConfig as HelperTextConfig | undefined
      );
      newResolvedProps.parser = await resolveWithTimeout(
        resolveZestConfigValue(mergedZestProps.parser, defaultResolvedZestProps.parser as InputParser<T> | undefined, inputType),
        timeout, 'parser', defaultResolvedZestProps.parser as InputParser<T> | undefined
      );
      newResolvedProps.validator = await resolveWithTimeout(
        resolveZestConfigValue(mergedZestProps.validator, defaultResolvedZestProps.validator as InputValidator<T> | undefined, inputType),
        timeout, 'validator', defaultResolvedZestProps.validator as InputValidator<T> | undefined
      );

      // ADD THIS NEW PROPERTY RESOLUTION
      newResolvedProps.helperTextPositioning = await resolveWithTimeout(
        resolveZestConfigValue(mergedZestProps.helperTextPositioning, defaultResolvedZestProps.helperTextPositioning as "reserved" | "absolute", inputType),
        timeout, 'helperTextPositioning', defaultResolvedZestProps.helperTextPositioning as "reserved" | "absolute"
      );

      // Only update state if the resolved props are actually different
      if (!deepEqual(newResolvedProps, resolvedZestProps)) {
        setResolvedZestProps(newResolvedProps);
      }
    };

    resolveProps();
  }, [mergedZestProps, inputType]); // Re-run effect if merged props change

  return resolvedZestProps;
};
