# jattac.libs.web.zest-textbox

A delightful, feature-rich, and highly customizable React textbox component. Built with accessibility and developer experience in mind.

`ZestTextbox` is a standalone component that extends the standard HTML `<input>` and `<textarea>` elements with a touch of zest, providing a polished, professional, and playful user experience.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Props API](#props-api)
  - [ZestProps Interface Details](#zestprops-interface-details)
- [Feature Examples](#feature-examples)
  - [Password Input with Visibility Toggle](#password-input-with-visibility-toggle)
  - [Character Counter & Progress Bar](#character-counter--progress-bar)
  - [Enhanced Numeric Input](#enhanced-numeric-input)
  - [Custom Parser & Validator](#custom-parser--validator)
  - [Sizing](#sizing)
  - [Theming (Light/Dark/System)](#theming-lightdarksystem)
  - [Multiline Textarea](#multiline-textarea)
  - [Helper Text with Formatting](#helper-text-with-formatting)
  - [Full Width Stretching](#full-width-stretching)
- [Centralized Configuration](#centralized-configuration)
- [Internal Architecture](#internal-architecture)
- [Breaking Changes](#breaking-changes)
- [Contributing](#contributing)
- [License](#license)

## Features

`ZestTextbox` isn't just another input field; it's crafted to bring a smile to your users' faces while providing robust functionality and a seamless developer experience.

*   **Responsive and Mobile-First:** Adapts beautifully to any screen size, ensuring a consistent UX.
*   **Light & Dark Mode:** Automatically respects user system preferences or can be explicitly set.
*   **Password Visibility Toggle:** A crucial accessibility and usability feature for password fields.
*   **Character Counter & Progress Bar:** Visual feedback on input length, with engaging animations as limits are approached.
*   **Enhanced Numeric Input:** Intelligent filtering for numbers, decimals, and negative values.
*   **Customizable Parsing & Validation:** Define how raw string input is converted to a desired type and validated, with context of the input `type`.
*   **Engaging Animations:** Subtle, delightful micro-interactions on focus and input.
*   **Accessible:** Built with `rem` units and best practices for inclusivity.
*   **Centralized Configuration:** Easily manage default behaviors and styles across your application using React Context.

## Installation

To install `jattac.libs.web.zest-textbox` in your project, run:

```bash
npm install jattac.libs.web.zest-textbox
```

## Basic Usage

Get started with `ZestTextbox` in seconds. It behaves just like a standard HTML `<input>` or `<textarea>`, but with added zest!

```jsx
import React from 'react';
import ZestTextbox from 'jattac.libs.web.zest-textbox';

const App = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Basic ZestTextbox</h1>
      <ZestTextbox placeholder="Enter your name" />
    </div>
  );
};

export default App;
```

## Props API

`ZestTextbox` accepts all standard HTML `<input>` and `<textarea>` props. Additionally, it introduces a powerful `zest` prop for all its custom enhancements.

| Prop        | Type                               | Default     | Description                                                                                                                              |
| ----------- | ---------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `zest`      | `ZestProps`                        | `undefined` | An object containing all custom configurations and behaviors specific to the ZestTextbox component. See `ZestProps` interface for details below. |
| `className` | `string`                           | `""`        | A custom CSS class to apply to the main textbox element.                                                                                 |
| `maxLength` | `number`                           | `undefined` | The maximum number of characters allowed. Enables the character counter and progress bar.                                                               |
| `type`      | `HtmlInputType`                    | `'text'`    | The type of the input element. All standard HTML input types are supported. Special handling is applied for `password` and `number`.     |

### `ZestProps` Interface Details

The `zest` prop is an object that encapsulates all the unique features of `ZestTextbox`. Its properties can accept primitive values, functions, or asynchronous functions (`ZestConfigValue<T>`) for dynamic configuration, especially useful with [Centralized Configuration](#centralized-configuration).

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
| `helperTextConfig`| `ZestConfigValue<HelperTextConfig>`                       | `undefined` | Configuration for dynamic helper text displayed below the input. Can be an object, a function returning an object, or a promise of an object. |
| `onTextChanged`   | `<T>(value: T | undefined) => void`                     | `undefined` | A callback function that is invoked whenever the textbox's value changes. Provides the *parsed and validated* value. `T` is the type returned by the `parser`.                                 |
| `zSize`           | `ZestConfigValue<"sm" | "md" | "lg">`                   | `'md'`      | Sets the size of the textbox, affecting padding and font size.                                                                           |
| `stretch`         | `ZestConfigValue<boolean>`                                | `false`     | If `true`, the component will stretch to the full width of its container.                                                                |
| `showProgressBar` | `ZestConfigValue<boolean>`                                | `false`     | If `true`, a progress bar indicating character count vs. `maxLength` will be displayed. Requires `maxLength` to be set.                  |
| `animatedCounter` | `ZestConfigValue<boolean>`                                | `false`     | If `true`, the character counter will change color as it approaches the `maxLength`. Requires `maxLength` to be set.                     |
| `theme`           | `ZestConfigValue<"light" | "dark" | "system">`           | `'system'`  | Controls the component's color scheme. `'system'` automatically detects the OS/browser preference.                                       |
| `isMultiline`     | `ZestConfigValue<boolean>`                                | `false`     | If `true`, the component will render as a `<textarea>`. If `false` or undefined, it renders as an `<input>`.                           |
| `parser`          | `ZestConfigValue<InputParser<any>>`                       | `undefined` | A function to parse the raw string input into a desired type. Receives `(value: string, inputType?: HtmlInputType)`. Returns `undefined` if parsing fails. Default parsers are provided for `type="number"`. |
| `validator`       | `ZestConfigValue<InputValidator<any>>`                    | `undefined` | A function to validate the parsed value. Receives `(value: T | undefined, inputType?: HtmlInputType)`. Returns `true` for valid, or a string error message for invalid. Default validators are provided for `type="number"`. |

## Feature Examples

Dive into practical examples demonstrating the power and flexibility of `ZestTextbox`.

### Password Input with Visibility Toggle

Simply set the `type` prop to `"password"` to enable the built-in visibility toggle.

```jsx
import React from 'react';
import ZestTextbox from 'jattac.libs.web.zest-textbox';

const PasswordExample = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Password Input</h2>
      <ZestTextbox type="password" placeholder="Enter your password" />
    </div>
  );
};

export default PasswordExample;
```

### Character Counter & Progress Bar

Enable the character counter with `maxLength` and add a visual progress bar and animated counter via `zest` props.

```jsx
import React from 'react';
import ZestTextbox from 'jattac.libs.web.zest-textbox';

const CounterExample = () => {
  const [text, setText] = React.useState('');
  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Character Counter & Progress Bar</h2>
      <ZestTextbox
        maxLength={100}
        placeholder="What's on your mind? (max 100 chars)"
        value={text}
        onTextChanged={setText}
        zest={{
          showProgressBar: true,
          animatedCounter: true,
        }}
      />
    </div>
  );
};

export default CounterExample;
```

### Enhanced Numeric Input

Set `type="number"` for intelligent filtering that allows only digits, a single decimal point, and a single leading negative sign. The `onTextChanged` callback will now receive a `number | undefined`.

```jsx
import React from 'react';
import ZestTextbox from 'jattac.libs.web.zest-textbox';

const NumericExample = () => {
  const [age, setAge] = React.useState<number | undefined>(undefined);
  const [price, setPrice] = React.useState<number | undefined>(undefined);

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Enhanced Numeric Input</h2>
      <p>Age: {age === undefined ? 'N/A' : age}</p>
      <ZestTextbox
        type="number"
        placeholder="Enter your age"
        onTextChanged={setAge}
      />
      <br /><br />
      <p>Price: {price === undefined ? 'N/A' : `$${price.toFixed(2)}`}</p>
      <ZestTextbox
        type="number"
        placeholder="Enter a price"
        onTextChanged={setPrice}
        defaultValue="19.99"
      />
    </div>
  );
};

export default NumericExample;
```

### Custom Parser & Validator

Define your own `parser` and `validator` functions to handle specific input requirements. The `inputType` is passed to these functions for context. Here, we'll create a custom parser and validator for a "positive integer" number input.

```jsx
import React from 'react';
import ZestTextbox, { InputParser, InputValidator, HtmlInputType } from 'jattac.libs.web.zest-textbox';

// Custom parser for positive integers
const positiveIntegerParser: InputParser<number> = (value: string, inputType?: HtmlInputType) => {
  if (inputType === 'number') {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
};

// Custom validator for positive integers
const positiveIntegerValidator: InputValidator<number> = (parsedValue: number | undefined, inputType?: HtmlInputType) => {
  if (inputType === 'number') {
    if (parsedValue === undefined) {
      return "Please enter a valid integer.";
    }
    if (parsedValue <= 0) {
      return "Value must be a positive integer.";
    }
  }
  return true;
};

const CustomNumericParserValidatorExample = () => {
  const [quantity, setQuantity] = React.useState<number | undefined>(undefined);

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Custom Numeric Parser & Validator</h2>
      <p>Quantity: {quantity === undefined ? 'N/A' : quantity}</p>
      <ZestTextbox
        type="number"
        placeholder="Enter positive quantity"
        onTextChanged={setQuantity}
        zest={{
          parser: positiveIntegerParser,
          validator: positiveIntegerValidator,
        }}
      />
    </div>
  );
};

export default CustomNumericParserValidatorExample;
```

### Sizing

Control the size of the textbox with the `zSize` property within the `zest` prop. Options are `"sm"`, `"md"` (default), and `"lg"`.

```jsx
import React from 'react';
import ZestTextbox from 'jattac.libs.web.zest-textbox';

const SizingExample = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Sizing</h2>
      <ZestTextbox zest={{ zSize: "sm" }} placeholder="Small" />
      <br /><br />
      <ZestTextbox zest={{ zSize: "md" }} placeholder="Medium (default)" />
      <br /><br />
      <ZestTextbox zest={{ zSize: "lg" }} placeholder="Large" />
    </div>
  );
};

export default SizingExample;
```

### Theming (Light/Dark/System)

Force the component into a specific theme or let it adapt to the user's system preference using the `theme` property.

```jsx
import React from 'react';
import ZestTextbox from 'jattac.libs.web.zest-textbox';

const ThemingExample = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Theming</h2>
      <ZestTextbox zest={{ theme: "light" }} placeholder="Light Mode" />
      <br /><br />
      <ZestTextbox zest={{ theme: "dark" }} placeholder="Dark Mode" />
      <br /><br />
      <ZestTextbox zest={{ theme: "system" }} placeholder="System Theme (default)" />
    </div>
  );
};

export default ThemingExample;
```

### Multiline Textarea

Render `ZestTextbox` as a `<textarea>` by setting `isMultiline` to `true` in the `zest` prop.

```jsx
import React from 'react';
import ZestTextbox from 'jattac.libs.web.zest-textbox';

const MultilineExample = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Multiline Textarea</h2>
      <ZestTextbox
        zest={{ isMultiline: true }}
        placeholder="Type a longer message here..."
        rows={4}
      />
    </div>
  );
};

export default MultilineExample;
```

### Helper Text with Formatting

Provide dynamic helper text below the input using `helperTextConfig`. You can format the input value and even provide a custom templater for rich rendering.

```jsx
import React from 'react';
import ZestTextbox from 'jattac.libs.web.zest-textbox';

const HelperTextExample = () => {
  const [value, setValue] = React.useState('');

  const currencyFormatter = (val) => {
    const num = parseFloat(val);
    return isNaN(num) ? '' : `$${num.toFixed(2)}`;
  };

  const customTemplater = (formattedValue) => (
    <span>
      Formatted: <strong>{formattedValue || 'N/A'}</strong>
    </span>
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Helper Text</h2>
      <ZestTextbox
        type="number"
        placeholder="Enter amount"
        onTextChanged={setValue}
        zest={{
          helperTextConfig: {
            formatter: currencyFormatter,
            templater: customTemplater,
          },
        }}
      />
      <br /><br />
      <ZestTextbox
        placeholder="Type something..."
        onTextChanged={setValue}
        zest={{
          helperTextConfig: {
            templater: (val) => (
              <span style={{ color: val.length > 10 ? 'red' : 'green' }}>
                Length: {val.length}
              </span>
            ),
          },
        }}
      />
    </div>
  );
};

export default HelperTextExample;
```

### Full Width Stretching

Make the textbox take up the full width of its parent container by setting `stretch` to `true` in the `zest` prop.

```jsx
import React from 'react';
import ZestTextbox from 'jattac.libs.web.zest-textbox';

const StretchExample = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto', border: '1px dashed #ccc' }}>
      <h2>Full Width Stretching</h2>
      <ZestTextbox zest={{ stretch: true }} placeholder="I stretch to full width!" />
    </div>
  );
};

export default StretchExample;
```

## Centralized Configuration

To maintain consistency and reduce boilerplate, `ZestTextbox` supports centralized configuration using React Context. This allows you to define default `ZestProps` for all `ZestTextbox` instances within a provider's scope. Component-level `zest` props will always override these global defaults.

### How it Works

1.  **`ZestTextboxConfigProvider`:** Wrap your application or a part of it with this provider. Pass a `value` prop containing the default `ZestProps` you want to apply.
2.  **`ZestConfigValue<T>`:** Properties within `ZestProps` can be a primitive value (`T`), a function returning `T` (`() => T`), or an asynchronous function returning a Promise of `T` (`() => Promise<T>`). This provides immense flexibility for dynamic or async defaults.

### Usage Example

Here's how you can set up a global theme and size, and then override it for a specific component. You can also define global default parsers and validators here.

```jsx
import React from 'react';
import ZestTextbox, { ZestTextboxConfigProvider, InputParser, InputValidator, HtmlInputType } from 'jattac.libs.web.zest-textbox';

// Global default parser for positive numbers
const globalPositiveNumberParser: InputParser<number> = (value: string, inputType?: HtmlInputType) => {
  if (inputType === 'number') {
    const parsed = parseFloat(value);
    return isNaN(parsed) || parsed <= 0 ? undefined : parsed;
  }
  return undefined;
};

// Global default validator for positive numbers
const globalPositiveNumberValidator: InputValidator<number> = (parsedValue: number | undefined, inputType?: HtmlInputType) => {
  if (inputType === 'number') {
    if (parsedValue === undefined) {
      return "Please enter a valid positive number.";
    }
  }
  return true;
};

const AppWithCentralConfig = () => {
  // Define your global default ZestProps
  const globalDefaultZestProps = {
    theme: "dark", // All textboxes will be dark by default
    zSize: () => "lg", // All textboxes will be large by default (function example)
    animatedCounter: Promise.resolve(true), // Async example
    parser: globalPositiveNumberParser, // Apply global positive number parser
    validator: globalPositiveNumberValidator, // Apply global positive number validator
  };

  const [amount, setAmount] = React.useState<number | undefined>(undefined);

  return (
    <ZestTextboxConfigProvider value={globalDefaultZestProps}>
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Centralized Configuration Example</h1>

        <h3>Default ZestTextbox (inherits global defaults)</h3>
        <ZestTextbox placeholder="I'm large, dark, animated, and expect positive numbers!" type="number" onTextChanged={setAmount} />
        <p>Amount: {amount === undefined ? 'N/A' : amount}</p>
        <br /><br />

        <h3>Overridden ZestTextbox (component props take precedence)</h3>
        <ZestTextbox
          placeholder="I'm light, overriding the global dark theme"
          zest={{ theme: "light" }} // Overrides the global dark theme
        />
        <br /><br />

        <h3>Another Default ZestTextbox</h3>
        <ZestTextbox placeholder="I'm also large, dark, animated, and expect positive numbers!" type="number" />
      </div>
    </ZestTextboxConfigProvider>
  );
};

export default AppWithCentralConfig;
```

### Prioritization Rules

The resolution order for `ZestProps` is as follows:

1.  **Component-level `zest` prop:** Explicit props passed directly to a `ZestTextbox` instance have the highest priority.
2.  **`ZestTextboxConfigProvider` `value` prop:** Defaults provided by the nearest `ZestTextboxConfigProvider` come next.
3.  **Hardcoded internal defaults:** If no `zest` prop is provided on the component and no provider is found (or a specific property isn't defined in the provider), internal hardcoded defaults are used.

## Internal Architecture

The `ZestTextbox` component has been refactored internally for improved maintainability, readability, and reusability. Its core logic is now distributed across several custom React hooks and smaller, focused sub-components. This internal restructuring does **not** introduce any breaking changes to the public API.

The internal structure now includes:
*   `UI/hooks/`: Contains custom React hooks (e.g., `useThemeDetector`, `usePasswordVisibility`, `useCharacterCounter`, `useHelperText`, `useZestTextboxConfig`, `useParsedAndValidatedInput`).
*   `UI/components/`: Contains smaller, focused UI components (e.g., `PasswordToggleButton`, `CharacterCounter`, `ProgressBar`, `HelperTextDisplay`).
*   `UI/utils/`: Contains utility functions (e.g., `numericInputFilter`, `defaultParsersAndValidators`).
*   `UI/types.ts`: Defines shared TypeScript interfaces and types (e.g., `HtmlInputType`, `InputParser`, `InputValidator`, `ZestConfigValue`, `ResolvedZestProps`).
*   `UI/contexts/`: Contains React Contexts and Providers (e.g., `ZestTextboxConfigContext`, `ZestTextboxConfigProvider`).

## Breaking Changes

### 0.1.7 - Encapsulation of Custom Props into `zest` Object

All custom props (`isMultiline`, `zSize`, `stretch`, `theme`, `animatedCounter`, `showProgressBar`, `onTextChanged`, `helperTextConfig`) have been removed as top-level props and are now encapsulated within a single `zest` object prop.

**Migration Guide:**

If you were previously using:

```jsx
<ZestTextbox
  isMultiline
  zSize="lg"
  theme="dark"
  onTextChanged={(value) => console.log(value)}
/>
```

You should now update your code to:

```jsx
<ZestTextbox
  zest={{
    isMultiline: true,
    zSize: "lg",
    theme: "dark",
    onTextChanged: (value) => console.log(value),
  }}
/>
```

## Contributing

Contributions are welcome! If you have a feature request, bug report, or pull request, please feel free to open an issue or submit a PR.

### Development Setup

1.  Clone the repository.
2.  Install dependencies with `npm install`.
3.  Run the build with `npm run build`.
4.  The internal architecture now includes `UI/hooks`, `UI/components`, `UI/utils`, and `UI/contexts` directories for better organization and separation of concerns.

## License

This project is licensed under the ISC License.
