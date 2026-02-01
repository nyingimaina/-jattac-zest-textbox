import { useEffect, useState, useMemo } from "react";
import { ZestProps, ZestConfigValue, ZestTextboxSize, HelperTextConfig, ResolvedZestProps } from "../types";
import { useZestTextboxConfig as useZestTextboxContext } from "../contexts/ZestTextboxConfigContext";

// Helper function to resolve a ZestConfigValue
async function resolveZestConfigValue<T>(
  configValue: ZestConfigValue<T> | undefined,
  defaultValue: T
): Promise<T> {
  if (configValue === undefined) {
    return defaultValue;
  }
  if (typeof configValue === "function") {
    const result = (configValue as () => T | Promise<T>)();
    return result instanceof Promise ? await result : result;
  }
  return configValue;
}

const defaultResolvedZestProps: ResolvedZestProps = {
  zSize: "md",
  stretch: false,
  showProgressBar: false,
  animatedCounter: false,
  theme: "system",
  isMultiline: false,
  onTextChanged: undefined,
  helperTextConfig: undefined,
};

export const useZestTextboxConfig = (componentZestProps: ZestProps | undefined) => {
  const { defaultZestProps: contextDefaultZestProps } = useZestTextboxContext();

  const [resolvedZestProps, setResolvedZestProps] = useState<ResolvedZestProps>(defaultResolvedZestProps);

  // Memoize the merged props to avoid unnecessary re-renders
  const mergedZestProps = useMemo(() => {
    // Component props take precedence over context default props, which take precedence over hardcoded defaults
    return { ...defaultResolvedZestProps, ...contextDefaultZestProps, ...componentZestProps };
  }, [contextDefaultZestProps, componentZestProps]);

  useEffect(() => {
    const resolveProps = async () => {
      const newResolvedProps: ResolvedZestProps = { ...defaultResolvedZestProps }; // Initialize with defaults

      // Resolve each property that can be a ZestConfigValue
      newResolvedProps.zSize = await resolveZestConfigValue(
        mergedZestProps.zSize,
        defaultResolvedZestProps.zSize
      );
      newResolvedProps.stretch = await resolveZestConfigValue(
        mergedZestProps.stretch,
        defaultResolvedZestProps.stretch
      );
      newResolvedProps.showProgressBar = await resolveZestConfigValue(
        mergedZestProps.showProgressBar,
        defaultResolvedZestProps.showProgressBar
      );
      newResolvedProps.animatedCounter = await resolveZestConfigValue(
        mergedZestProps.animatedCounter,
        defaultResolvedZestProps.animatedCounter
      );
      newResolvedProps.theme = await resolveZestConfigValue(
        mergedZestProps.theme,
        defaultResolvedZestProps.theme
      );
      newResolvedProps.isMultiline = await resolveZestConfigValue(
        mergedZestProps.isMultiline,
        defaultResolvedZestProps.isMultiline
      );
      // onTextChanged is no longer a ZestConfigValue, so it's directly assigned
      newResolvedProps.onTextChanged = mergedZestProps.onTextChanged;

      newResolvedProps.helperTextConfig = await resolveZestConfigValue(
        mergedZestProps.helperTextConfig,
        defaultResolvedZestProps.helperTextConfig
      );

      setResolvedZestProps(newResolvedProps);
    };

    resolveProps();
  }, [mergedZestProps]); // Re-run effect if merged props change

  return resolvedZestProps;
};