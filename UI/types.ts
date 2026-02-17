import React from "react";

export type ZestTextboxSize = "sm" | "md" | "lg";

// Define the union type for HTML input types supported by ZestTextbox
export type HtmlInputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "color"
  | "date"
  | "datetime-local"
  | "month"
  | "time"
  | "week"
  | "currency"
  | "percentage";

export type ZestConfigValue<T> = T | ((inputType?: HtmlInputType) => T) | ((inputType?: HtmlInputType) => Promise<T>);

// Define InputParser and InputValidator types
export type InputParser<T> = (value: string, inputType?: HtmlInputType) => T | undefined;
export type InputValidator<T> = (value: T | undefined, inputType?: HtmlInputType) => boolean | string; // Returns boolean for valid, string for error message

// The rich context object for advanced, dynamic configurations.
export interface ZestContext<T = string> {
  /** The raw string value from the textbox. */
  value: string;
  /** The parsed and validated value. Its type is determined by the active parser. */
  parsedValue?: T;
  /** The full set of props passed to the ZestTextbox component instance. */
  props: ZestTextboxProps<T>;
}

export interface HelperTextConfig {
  /**
   * A function to process data into a new string, which is then passed to the templater.
   * Ideal for formatting operations like currency conversion or sanitization.
   * @param context A rich object containing the input's value, parsedValue, and props.
   * @returns The processed string to be used by the templater.
   */
  formatter?: (context: ZestContext<any>) => string;

  /**
   * An optional function for advanced rendering of the helper text.
   * It receives the processed string (from `formatter`) and the full context object.
   * @param formattedValue The string returned from the `formatter` function.
   * @param context A rich object containing the input's value, parsedValue, and props.
   * @returns The ReactNode to be rendered as helper text.
   */
  templater?: (formattedValue: string, context: ZestContext<any>) => React.ReactNode;

  /**
   * An optional CSS class to apply to the helper text container for custom styling.
   */
  className?: string;
}

export interface ZestProps<T = string> { // Made ZestProps generic
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
  onTextChanged?: (value: T | undefined) => void; // Uses component's T
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
  parser?: ZestConfigValue<InputParser<T>>; // Parser is now generic over T
  /**
   * A function to validate the parsed value.
   * Returns `true` for valid, or a string error message for invalid.
   */
  validator?: ZestConfigValue<InputValidator<T>>; // Validator is now generic over T
  /**
   * Controls the positioning of the helper text, influencing DOM layout.
   * - 'reserved': Always reserves space for the helper text, preventing layout shifts.
   *               Helper text is invisible when empty. (Recommended for stable layouts)
   * - 'absolute': Positions the helper text absolutely, allowing it to "float" without affecting
   *               the surrounding layout. Can cause overlap if not managed carefully by the consumer.
   * @default 'absolute'
   */
  helperTextPositioning?: ZestConfigValue<"reserved" | "absolute">;
}

// Resolved ZestProps type, where all ZestConfigValue types are resolved to their base types
export interface ResolvedZestProps<T = string> { // Made ResolvedZestProps generic
  helperTextConfig: HelperTextConfig | undefined;
  onTextChanged: ((value: T | undefined) => void) | undefined; // Uses component's T
  zSize: ZestTextboxSize;
  stretch: boolean;
  showProgressBar: boolean;
  animatedCounter: boolean;
  theme: "light" | "dark" | "system";
  isMultiline: boolean;
  parser: InputParser<T> | undefined; // Parser is now generic over T
  validator: InputValidator<T> | undefined; // Validator is now generic over T
  helperTextPositioning: "reserved" | "absolute"; // New property
}

type SharedProps<T> = { // Made SharedProps generic
  /**
   * An object containing all custom configurations and behaviors specific to the ZestTextbox component.
   * This encapsulates all non-native HTML input/textarea props for better discoverability and DX.
   * @see ZestProps
   */
  zest?: ZestProps<T>; // Uses generic T
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
  /**
   * Standard React `onChange` event handler.
   * The event object will be typed as a union of `HTMLInputElement` and `HTMLTextAreaElement` change events.
   * Note that `ZestTextbox` also provides a type-safe `onTextChanged` callback within `ZestProps` for handling parsed and validated values.
   * If both `onChange` and `zest.onTextChanged` are provided, both will be triggered.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

type InputOnlyProps<T> = SharedProps<T> & // Made InputOnlyProps generic
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange">;

type TextareaOnlyProps<T> = SharedProps<T> & // Made TextareaOnlyProps generic
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange">;

export type ZestTextboxProps<T = string> = InputOnlyProps<T> | TextareaOnlyProps<T>; // Made ZestTextboxProps generic
