import React from "react";
export type ZestTextboxSize = "sm" | "md" | "lg";
export type ZestConfigValue<T> = T | (() => T) | (() => Promise<T>);
export interface HelperTextConfig {
    /**
     * A function to process the raw input value into a new string.
     * Ideal for formatting operations like currency conversion or sanitization.
     * @param value The raw string value from the textbox.
     * @returns The processed string to be used by the templater or for default rendering.
     */
    formatter?: (value: string) => string;
    /**
     * An optional function for advanced rendering of the helper text.
     * It receives the processed string (from `formatter` or the raw value if no formatter is provided)
     * and should return a ReactNode. If not provided, the processed string
     * is rendered with default muted styling.
     * @param formattedValue The processed string.
     * @returns The ReactNode to be rendered as helper text.
     */
    templater?: (formattedValue: string) => React.ReactNode;
    /**
     * An optional CSS class to apply to the helper text container for custom styling.
     */
    className?: string;
}
export interface ZestProps {
    /**
     * An object to configure the dynamic helper text displayed below the input.
     * @see HelperTextConfig
     */
    helperTextConfig?: ZestConfigValue<HelperTextConfig>;
    /**
     * A callback that provides the raw string value of the input on every change.
     * This is a convenience prop to avoid using `event.target.value`.
     * @param value The current string value of the input.
     */
    onTextChanged?: (value: string) => void;
    /**
     * Sets the size of the textbox, affecting padding and font size.
     * @default 'md'
     */
    zSize?: ZestConfigValue<ZestTextboxSize>;
    /**
     * If `true`, the component will stretch to the full width of its container.
     * @default false
     */
    stretch?: ZestConfigValue<boolean>;
    /**
     * If `true`, a progress bar indicating character count vs. `maxLength` will be displayed.
     * Requires `maxLength` to be set.
     * @default false
     */
    showProgressBar?: ZestConfigValue<boolean>;
    /**
     * If `true`, the character counter will change color as it approaches the `maxLength`.
     * Requires `maxLength` to be set.
     * @default false
     */
    animatedCounter?: ZestConfigValue<boolean>;
    /**
     * Controls the component's color scheme.
     * `'system'` automatically detects the OS/browser preference.
     * @default 'system'
     */
    theme?: ZestConfigValue<"light" | "dark" | "system">;
    /**
     * If `true`, the component will render as a `<textarea>`.
     * If `false` or undefined, it renders as an `<input>`.
     * @default false
     */
    isMultiline?: ZestConfigValue<boolean>;
}
export interface ResolvedZestProps {
    helperTextConfig: HelperTextConfig | undefined;
    onTextChanged: ((value: string) => void) | undefined;
    zSize: ZestTextboxSize;
    stretch: boolean;
    showProgressBar: boolean;
    animatedCounter: boolean;
    theme: "light" | "dark" | "system";
    isMultiline: boolean;
}
