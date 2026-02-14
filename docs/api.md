# Props API

`ZestTextbox` accepts all standard HTML `<input>` and `<textarea>` props. Additionally, it introduces a powerful `zest` prop for all its custom enhancements.

| Prop        | Type                               | Default     | Description                                                                                                                              |
| ----------- | ---------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `zest`      | `ZestProps`                        | `undefined` | An object containing all custom configurations and behaviors specific to the ZestTextbox component. See `ZestProps` interface for details below. |
| `className` | `string`                           | `""`        | A custom CSS class to apply to the main textbox element.                                                                                 |
| `maxLength` | `number`                           | `undefined` | The maximum number of characters allowed. Enables the character counter and progress bar.                                                               |
| `type`      | `HtmlInputType`                    | `'text'`    | The type of the input element. All standard HTML input types are supported, plus the semantic types "currency" and "percentage". Special handling is applied for `password`, `number`, `currency`, and `percentage`.     |

## `ZestProps` Interface Details

The `zest` prop is an object that encapsulates all the unique features of `ZestTextbox`. Its properties can accept primitive values, functions that receive the input's `type` for type-aware logic, or asynchronous versions of those functions (`ZestConfigValue<T>`). This is especially powerful for dynamic, app-wide settings with [Centralized Configuration](#centralized-configuration).

```typescript
import { ZestTextboxSize, ZestConfigValue, HelperTextConfig, InputParser, InputValidator, HtmlInputType } from 'jattac.libs.web.zest-textbox';

interface ZestProps {
  helperTextConfig?: ZestConfigValue<HelperTextConfig>;
  onTextChanged?: <T>(value: T | undefined) => void; // Callback for parsed & validated text changes
  zSize?: ZestConfigValue<ZestTextboxSize>; // "sm" | "md" | "lg"
  stretch?: ZestConfigValue<boolean>; // Full width
  showProgressBar?: ZestConfigValue<boolean>; // Display character progress bar
  animatedCounter?: ZestConfigValue<boolean>; // Counter color changes
  theme?: ZestConfigValue<"light" | "dark" | "system">; // Color scheme
  isMultiline?: ZestConfigValue<boolean>; // Render as <textarea>
  parser?: ZestConfigValue<InputParser<any>>; // Custom parser function
  validator?: ZestConfigValue<InputValidator<any>>; // Custom validator function
}
```

| Property          | Type (`ZestConfigValue<T>`)                               | Default     | Description                                                                                                                              |
| ----------------- | --------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `helperTextConfig`| `ZestConfigValue<HelperTextConfig>`                       | `undefined` | **Use Case:** Display dynamic instructions, formatted values, or validation messages. The `templater` function within `HelperTextConfig` receives a `context` object where `inputType` is accessible via `context.props.type`. If the `templater` returns `null`, `undefined`, or an empty string (`""`), the helper text will not be rendered. This property accepts a static `HelperTextConfig` object, a function that returns `HelperTextConfig` (optionally based on `inputType`), or an async function returning a `Promise<HelperTextConfig>`. |
| `onTextChanged`   | `<T>(value: T | undefined) => void`                     | `undefined` | **Use Case:** A type-safe way to get the parsed and validated value from the component without needing to manually handle `event.target.value` and parse it yourself. Accepts a static function, a function returning a callback (optionally based on `inputType`), or an async function returning a `Promise` of a callback. `T` is the type returned by the `parser`.                                 |
| `zSize`           | `ZestConfigValue<"sm" | "md" | "lg">`                   | `'md'`      | **Use Case:** Control the visual size of the textbox for different contexts (e.g., small for a search bar, large for a title field). Accepts a static size value (`"sm"` | `"md"` | `"lg"`), a function that returns a size based on `inputType`, or an async function returning a `Promise` of a size.                                                                           |
| `stretch`         | `ZestConfigValue<boolean>`                                | `false`     | **Use Case:** Make the textbox fill the entire width of its container, useful for forms and page layouts. Accepts a static boolean, a function that returns a boolean based on `inputType`, or an async function returning a `Promise` of a boolean.                                                                |
| `showProgressBar` | `ZestConfigValue<boolean>`                                | `false`     | **Use Case:** Provide a clear visual indicator of how close the user is to the `maxLength`. Requires `maxLength` to be set. Accepts a static boolean, a function that returns a boolean based on `inputType`, or an async function returning a `Promise` of a boolean.                  |
| `animatedCounter` | `ZestConfigValue<boolean>`                                | `false`     | **Use Case:** Draw the user's attention to the character counter as they approach the `maxLength`. Requires `maxLength` to be set. Accepts a static boolean, a function that returns a boolean based on `inputType`, or an async function returning a `Promise` of a boolean.                     |
| `theme`           | `ZestConfigValue<"light" | "dark" | "system">`           | `'system'`  | **Use Case:** Force the component to a specific theme, or let it automatically adapt to the user's system preference. Accepts a static theme value (`"light"` | `"dark"` | `"system"`), a function that returns a theme based on `inputType`, or an async function returning a `Promise` of a theme.                                       |
| `isMultiline`     | `ZestConfigValue<boolean>`                                | `false`     | **Use Case:** Allow for multi-line text input, rendering the component as a `<textarea>`. Accepts a static boolean, a function that returns a boolean based on `inputType`, or an async function returning a `Promise` of a boolean.                           |
| `parser`          | `ZestConfigValue<InputParser<any>>`                       | `undefined` | **Use Case:** Convert the raw string input into a specific data type (e.g., a `Date` object, a custom data structure). Receives `(value: string, inputType?: HtmlInputType)`. Returns `undefined` if parsing fails. Default parsers are provided for `type="number"`. Accepts a static `InputParser` function, a function that returns an `InputParser` based on `inputType`, or an async function returning a `Promise` of an `InputParser`. |
| `validator`       | `ZestConfigValue<InputValidator<any>>`                    | `undefined` | **Use Case:** Implement custom validation logic (e.g., checking for a minimum length, a specific format, or even an async check against an API). Receives `(value: T | undefined, inputType?: HtmlInputType)`. Returns `true` for valid, or a string error message for invalid. Default validators are provided for `type="number"`. Accepts a static `InputValidator` function, a function that returns an `InputValidator` based on `inputType`, or an async function returning a `Promise` of an `InputValidator`. |
| `helperTextPositioning`| `ZestConfigValue<"reserved" | "absolute">`            | `'absolute'`| **Use Case:** Control how helper text affects the layout. Use `'reserved'` to prevent layout shifts, and `'absolute'` for floating helper text. Accepts a static value (`"reserved"` or `"absolute"`), a function that returns a position based on `inputType`, or an async function returning a `Promise` of a position. `'absolute'` can cause overlap with elements below if not managed by the consumer. |