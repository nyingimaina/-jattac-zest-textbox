import React from "react";
export type ZestTextboxSize = "sm" | "md" | "lg";
export type HtmlInputType = "text" | "email" | "password" | "number" | "tel" | "url" | "search" | "color" | "date" | "datetime-local" | "month" | "time" | "week" | "currency" | "percentage";
export type ZestConfigValue<T> = T | ((inputType?: HtmlInputType) => T) | ((inputType?: HtmlInputType) => Promise<T>);
export type InputParser<T> = (value: string, inputType?: HtmlInputType) => T | undefined;
export type InputValidator<T> = (value: T | undefined, inputType?: HtmlInputType) => boolean | string;
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
export interface ZestProps<T = string> {
    /**
     * An object to configure the dynamic helper text displayed below the input.
     * @see HelperTextConfig
     */
    helperTextConfig?: ZestConfigValue<HelperTextConfig>;
    /**
     * A callback that provides the parsed and validated value of the input on every valid change.
     * This is a convenience prop to avoid using `event.target.value` and manual parsing/validation.
     * @param value The current parsed and validated value of the input, or `undefined` if parsing failed.
     */
    onTextChanged?: (value: T | undefined) => void;
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
    /**
     * A function to parse the raw string input into a desired type.
     * Returns `undefined` if parsing fails.
     */
    parser?: ZestConfigValue<InputParser<T>>;
    /**
     * A function to validate the parsed value.
     * Returns `true` for valid, or a string error message for invalid.
     */
    validator?: ZestConfigValue<InputValidator<T>>;
}
export interface ResolvedZestProps<T = string> {
    helperTextConfig: HelperTextConfig | undefined;
    onTextChanged: ((value: T | undefined) => void) | undefined;
    zSize: ZestTextboxSize;
    stretch: boolean;
    showProgressBar: boolean;
    animatedCounter: boolean;
    theme: "light" | "dark" | "system";
    isMultiline: boolean;
    parser: InputParser<T> | undefined;
    validator: InputValidator<T> | undefined;
}
type SharedProps<T> = {
    /**
     * An object containing all custom configurations and behaviors specific to the ZestTextbox component.
     * This encapsulates all non-native HTML input/textarea props for better discoverability and DX.
     * @see ZestProps
     */
    zest?: ZestProps<T>;
    /**
     * A custom CSS class to apply to the main textbox element.
     */
    className?: string;
    /**
     * The maximum number of characters allowed in the input.
     * Enables the character counter.
     */
    maxLength?: number;
    /**
     * The type of the input element. All standard HTML input types are supported.
     * Special handling is applied for `password` and `number`.
     * @default 'text'
     */
    type?: HtmlInputType;
};
type InputOnlyProps<T> = SharedProps<T> & // Made InputOnlyProps generic
Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> & {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
};
type TextareaOnlyProps<T> = SharedProps<T> & // Made TextareaOnlyProps generic
Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
};
export type ZestTextboxProps<T = string> = InputOnlyProps<T> | TextareaOnlyProps<T>;
export {};
