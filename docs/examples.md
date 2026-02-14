# Feature Examples

Dive into practical examples demonstrating the power and flexibility of `ZestTextbox`.

## Password Input with Visibility Toggle

Simply set the `type` prop to `"password"` to enable the built-in visibility toggle. This provides a crucial accessibility and usability feature for password fields, allowing users to see what they're typing.

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

## Character Counter & Progress Bar

Provide visual feedback on input length by setting the `maxLength` prop. You can enhance this by displaying a progress bar and animating the counter color.

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

## Numeric and Semantic Inputs

Use `type="number"` for intelligent filtering that allows only digits, a single decimal point, and a single leading negative sign. The `onTextChanged` callback will now receive a `number | undefined`. You can also use semantic types like `type="currency"` or `type="percentage"` for clearer intent.

```jsx
import React from 'react';
import ZestTextbox from 'jattac.libs.web.zest-textbox';

const NumericExample = () => {
  const [age, setAge] = React.useState<number | undefined>(undefined);
  const [price, setPrice] = React.useState<number | undefined>(undefined);

  const currencyFormatter = (val: string) => {
    const num = parseFloat(val);
    return num === undefined ? '' : `${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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

## Custom Parser & Validator

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

## Sizing

Control the visual size of the textbox for different contexts (e.g., small for a search bar, large for a title field) with the `zSize` property within the `zest` prop. Options are `"sm"`, `"md"` (default), and `"lg"`.

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

## Theming (Light/Dark/System)

Force the component to a specific theme, or let it automatically adapt to the user's system preference using the `theme` property.

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

## Multiline Textarea

Render `ZestTextbox` as a `<textarea>` to allow for multi-line text input by setting `isMultiline` to `true` in the `zest` prop.

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

## Helper Text with Formatting

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

## Full Width Stretching

Make the textbox fill the entire width of its container, useful for forms and page layouts, by setting `stretch` to `true` in the `zest` prop.

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

## Helper Text Positioning

Control how helper text affects the layout using the `helperTextPositioning` prop. Use `'reserved'` to prevent layout shifts, and `'absolute'` for floating helper text.

```jsx
import React from 'react';
import ZestTextbox from 'jattac.libs.web.zest-textbox';

const HelperTextPositioningExample = () => {
  const [textReserved, setTextReserved] = React.useState('');
  const [textAbsolute, setTextAbsolute] = React.useState('');

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto', border: '1px dashed #ccc' }}>
      <h2>Helper Text Positioning</h2>

      <h3>Reserved Space (prevents layout shift)</h3>
      <ZestTextbox
        maxLength={30}
        placeholder="Type here (reserved space)"
        zest={{
          onTextChanged: setTextReserved,
          helperTextPositioning: "reserved",
          helperTextConfig: {
            templater: () => (
              <span>This helper text reserves space.</span>
            ),
          },
        }}
      />
      <p style={{ marginTop: '2rem' }}>Content below the reserved textbox.</p> {/* This content won't jump */}

      <br /><br />

      <h3>Absolute Positioning (may cause overlap)</h3>
      <ZestTextbox
        maxLength={30}
        placeholder="Type here (absolute position)"
        zest={{
          onTextChanged: setTextAbsolute,
          helperTextPositioning: "absolute", // Default, but explicit here
          helperTextConfig: {
            templater: () => (
              <span>This helper text floats.</span>
            ),
          },
        }}
      />
      <p style={{ marginTop: '0.5rem' }}>Content below the absolute textbox.</p> {/* This content might be overlapped */}

    </div>
  );
};

export default HelperTextPositioningExample;
```