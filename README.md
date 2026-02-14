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
| `type`      | `HtmlInputType`                    | `'text'`    | The type of the input element. All standard HTML input types are supported, plus the semantic types "currency" and "percentage". Special handling is applied for `password`, `number`, `currency`, and `percentage`.     |

### `ZestProps` Interface Details

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
| `helperTextConfig`| `ZestConfigValue<HelperTextConfig>`                       | `undefined` | Configuration for dynamic helper text displayed below the input. Accepts a static `HelperTextConfig` object, a function that returns `HelperTextConfig` (optionally based on `inputType`), or an async function returning a `Promise<HelperTextConfig>`. |
| `onTextChanged`   | `<T>(value: T | undefined) => void`                     | `undefined` | A callback function that is invoked whenever the textbox's value changes. Provides the *parsed and validated* value. Accepts a static function, a function returning a callback (optionally based on `inputType`), or an async function returning a `Promise` of a callback. `T` is the type returned by the `parser`.                                 |
| `zSize`           | `ZestConfigValue<"sm" | "md" | "lg">`                   | `'md'`      | Sets the size of the textbox, affecting padding and font size. Accepts a static size value (`"sm"` | `"md"` | `"lg"`), a function that returns a size based on `inputType`, or an async function returning a `Promise` of a size.                                                                           |
| `stretch`         | `ZestConfigValue<boolean>`                                | `false`     | If `true`, the component will stretch to the full width of its container. Accepts a static boolean, a function that returns a boolean based on `inputType`, or an async function returning a `Promise` of a boolean.                                                                |
| `showProgressBar` | `ZestConfigValue<boolean>`                                | `false`     | If `true`, a progress bar indicating character count vs. `maxLength` will be displayed. Requires `maxLength` to be set. Accepts a static boolean, a function that returns a boolean based on `inputType`, or an async function returning a `Promise` of a boolean.                  |
| `animatedCounter` | `ZestConfigValue<boolean>`                                | `false`     | If `true`, the character counter will change color as it approaches the `maxLength`. Requires `maxLength` to be set. Accepts a static boolean, a function that returns a boolean based on `inputType`, or an async function returning a `Promise` of a boolean.                     |
| `theme`           | `ZestConfigValue<"light" | "dark" | "system">`           | `'system'`  | Controls the component's color scheme. `'system'` automatically detects the OS/browser preference. Accepts a static theme value (`"light"` | `"dark"` | `"system"`), a function that returns a theme based on `inputType`, or an async function returning a `Promise` of a theme.                                       |
| `isMultiline`     | `ZestConfigValue<boolean>`                                | `false`     | If `true`, the component will render as a `<textarea>`. If `false` or `undefined`, it renders as an `<input>`. Accepts a static boolean, a function that returns a boolean based on `inputType`, or an async function returning a `Promise` of a boolean.                           |
| `parser`          | `ZestConfigValue<InputParser<any>>`                       | `undefined` | A function to parse the raw string input into a desired type. Receives `(value: string, inputType?: HtmlInputType)`. Returns `undefined` if parsing fails. Default parsers are provided for `type="number"`. Accepts a static `InputParser` function, a function that returns an `InputParser` based on `inputType`, or an async function returning a `Promise` of an `InputParser`. |
| `validator`       | `ZestConfigValue<InputValidator<any>>`                    | `undefined` | A function to validate the parsed value. Receives `(value: T | undefined, inputType?: HtmlInputType)`. Returns `true` for valid, or a string error message for invalid. Default validators are provided for `type="number"`. Accepts a static `InputValidator` function, a function that returns an `InputValidator` based on `inputType`, or an async function returning a `Promise` of an `InputValidator`. |

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
        zest={{
          showProgressBar: true,
          animatedCounter: true,
          onTextChanged: setText,
        }}
      />
    </div>
  );
};

export default CounterExample;
```

### Numeric and Semantic Inputs

Set `type="number"` for intelligent filtering that allows only digits, a single decimal point, and a single leading negative sign. The `onTextChanged` callback will now receive a `number | undefined`.

You can also use the semantic types `type="currency"` or `type="percentage"`. These behave identically to `type="number"` by default but provide clearer intent and allow for type-specific logic in global configurations.

```jsx
import React from 'react';
import ZestTextbox from 'jattac.libs.web.zest-textbox';

const NumericExample = () => {
  const [age, setAge] = React.useState<number | undefined>(undefined);
  const [price, setPrice] = React.useState<number | undefined>(undefined);

  const currencyFormatter = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) ? '' : `${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Numeric and Semantic Inputs</h2>
      <p>Age (type="number"): {age === undefined ? 'N/A' : age}</p>
      <ZestTextbox
        type="number"
        placeholder="Enter your age"
        zest={{ onTextChanged: setAge }}
      />
      <br /><br />
      <p>Price (type="currency"): {price === undefined ? 'N/A' : price}</p>
      <ZestTextbox
        type="currency"
        placeholder="Enter a price"
        defaultValue="19.99"
        zest={{
          onTextChanged: setPrice,
          helperTextConfig: {
            formatter: currencyFormatter,
            templater: (formatted) => `Formatted: ${formatted}`
          }
        }}
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
        zest={{
          onTextChanged: setQuantity,
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

Provide dynamic helper text below the input using `helperTextConfig`. The `formatter` and `templater` functions now receive a rich `context` object, giving you access to the raw `value`, `parsedValue`, and the component's `props`.

```jsx
import React from 'react';
import ZestTextbox, { ZestContext } from 'jattac.libs.web.zest-textbox';

const HelperTextExample = () => {
  const [amount, setAmount] = React.useState<number | undefined>(undefined);
  const [message, setMessage] = React.useState('');

  const currencyFormatter = (context: ZestContext<number>) => {
    const num = context.parsedValue;
    return num === undefined ? '' : `${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const messageTemplater = (formattedValue: string, context: ZestContext<string>) => (
    <span style={{ color: context.value.length > (context.props.maxLength || 0) * 0.8 ? 'orange' : 'green' }}>
      Length: {context.value.length} / {context.props.maxLength || '∞'}
    </span>
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Helper Text</h2>
      <ZestTextbox
        type="currency"
        placeholder="Enter amount"
        zest={{
          onTextChanged: setAmount,
          helperTextConfig: {
            formatter: currencyFormatter,
            templater: (formatted, context) => (
              <span>
                Formatted: <strong>{formatted || 'N/A'}</strong> (Type: {context.props.type})
              </span>
            ),
          },
        }}
      />
      <br /><br />
      <ZestTextbox
        maxLength={50}
        placeholder="Type something (max 50 chars)..."
        zest={{
          onTextChanged: setMessage,
          helperTextConfig: {
            templater: messageTemplater,
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

To maintain consistency, reduce boilerplate, and enable dynamic, type-aware behaviors, `ZestTextbox` offers a powerful centralized configuration system using React Context. This allows you to define default `ZestProps` that will apply to all `ZestTextbox` instances within the provider's scope. Component-level `zest` props will always take precedence over these global defaults.

### Understanding `ZestConfigValue<T>`

The flexibility of centralized configuration comes from the `ZestConfigValue<T>` type. For any property within `ZestProps`, you can provide a value in one of three ways:

1.  **A direct value (`T`):** A simple, static value.
    ```typescript
    theme: "dark" // All textboxes will be dark
    ```
2.  **A function `((inputType?: HtmlInputType) => T)`:** A function that receives the `inputType` of the `ZestTextbox` instance. This enables dynamic defaults based on the input's type.
    ```typescript
    zSize: (inputType) => {
      if (inputType === 'password') return 'sm'; // Small for passwords
      return 'lg'; // Large for everything else
    }
    ```
3.  **An asynchronous function `((inputType?: HtmlInputType) => Promise<T>)`:** Similar to the function above, but returns a Promise. Useful if a configuration value needs to be fetched or computed asynchronously.
    ```typescript
    animatedCounter: Promise.resolve(true) // Async example (e.g., could fetch from an API)
    ```

### Usage with `ZestTextboxConfigProvider`

Wrap your application or a part of it with the `ZestTextboxConfigProvider`. Pass a `value` prop containing the default `ZestProps` you want to apply.

```jsx
import React from 'react';
import ZestTextbox, {
  ZestTextboxConfigProvider,
  HtmlInputType,
  HelperTextConfig,
  ZestContext,
  InputParser,
  InputValidator
} from 'jattac.libs.web.zest-textbox';

const AppWithCentralConfig = () => {

  const globalDefaultZestProps = {
    // Global theme and stretching
    theme: "system",
    stretch: true,

    // Make size dynamic based on the input type
    zSize: (inputType?: HtmlInputType) => {
      if (inputType === 'password') return 'sm'; // Small for passwords
      return 'md'; // Medium for everything else
    },

    // Example: Global helper text for numeric inputs (comma-separated, max 2 decimal places)
    helperTextConfig: (inputType?: HtmlInputType): HelperTextConfig => {
      if (inputType === 'number' || inputType === 'currency' || inputType === 'percentage') {
        return {
          formatter: (context: ZestContext<number>): string => {
            const num = context.parsedValue;
            if (num === undefined || isNaN(num)) {
              return '';
            }
            return num.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            });
          },
          templater: (formattedValue: string): React.ReactNode => {
            return formattedValue ? <span>Formatted: <strong>{formattedValue}</strong></span> : null;
          }
        };
      }
      return {}; // Always return an object
    },

    // Example: Global email validator
    validator: (value: string | undefined, inputType?: HtmlInputType): boolean | string => {
      if (inputType === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address.';
      }
      return true;
    },

    // Async example (e.g., if animatedCounter was a feature flag from an API)
    animatedCounter: Promise.resolve(true),
  };

  return (
    <ZestTextboxConfigProvider value={globalDefaultZestProps}>
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Centralized Configuration Example</h1>

        <h3>Textboxes inheriting global defaults:</h3>
        <ZestTextbox placeholder="Normal input (medium, system theme, stretched)" />
        <br /><br />
        <ZestTextbox type="password" placeholder="Password (small, system theme, stretched)" />
        <br /><br />
        <ZestTextbox type="number" placeholder="Numeric with global helper text" />
        <br /><br />
        <ZestTextbox type="email" placeholder="Email with global validator" />
        <br /><br />

        <h3>Textbox with component-level override:</h3>
        <ZestTextbox
          placeholder="I'm large and light, overriding global defaults"
          zest={{ theme: "light", zSize: "lg" }} // Overrides global theme and size
        />
      </div>
    </ZestTextboxConfigProvider>
  );
};

export default AppWithCentralConfig;
```

### Prioritization Rules

The resolution order for `ZestProps` is crucial for understanding how final behaviors are determined:

1.  **Component-level `zest` prop:** Explicit props passed directly to a `ZestTextbox` instance always take the highest priority, overriding any values set by providers or internal defaults.
2.  **`ZestTextboxConfigProvider` `value` prop:** Defaults provided by the nearest `ZestTextboxConfigProvider` come next. These values will be applied if the component-level `zest` prop does not specify a particular property. When a `ZestConfigValue<T>` is a function or an asynchronous function, it is evaluated at this stage, with the `inputType` of the specific `ZestTextbox` instance.
3.  **Hardcoded internal defaults:** If a specific `zest` property is not defined at the component level *and* not provided by any `ZestTextboxConfigProvider`, the component falls back to its own internal hardcoded default values for that property.

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
