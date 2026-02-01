# jattac.libs.web.zest-textbox

A delightful, feature-rich, and highly customizable React textbox component. Built with accessibility and developer experience in mind.

`ZestTextbox` is a standalone component that extends the standard HTML `<input>` and `<textarea>` elements with a touch of zest, providing a polished, professional, and playful user experience.

## Table of Contents

- [Features](#features)
- [Internal Architecture](#internal-architecture)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Props API](#props-api)
- [Feature Examples](#feature-examples)
  - [Password Input](#password-input)
  - [Character Counter & Progress Bar](#character-counter--progress-bar)
  - [Sizing](#sizing)
  - [Theming](#theming)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Responsive and Mobile-First:** Designed to look great on any screen size.
- **Light & Dark Mode:** Automatically adapts to the user's system theme, or can be forced into a specific mode.
- **Password Visibility Toggle:** A common-sense feature for all password inputs.
- **Character Counter:** Provides clear feedback on input length.
- **Enhanced Numeric Input:** Smart handling for numeric inputs, allowing decimals and negatives while preventing non-numeric characters.
- **Engaging Animations:** Subtle, delightful animations on focus and interaction.
- **Progress Bar:** A visual indicator of the user's progress towards the `maxLength`.
- **Accessible:** Uses `rem` units for scalability and follows accessibility best practices.

## Internal Architecture

The `ZestTextbox` component has been refactored internally for improved maintainability, readability, and reusability. Its core logic is now distributed across several custom React hooks and smaller, focused sub-components. This internal restructuring does **not** introduce any breaking changes to the public API.

## Installation

To install the component, run the following command in your project directory:

```bash
npm install jattac.libs.web.zest-textbox
```

## Basic Usage

Here's a simple example of how to use the `ZestTextbox` in your React application:

```jsx
import React from 'react';
import ZestTextbox from 'jattac.libs.web.zest-textbox';

const App = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <ZestTextbox placeholder="Enter your name" />
    </div>
  );
};

export default App;
```

## Props API

The `ZestTextbox` component accepts all standard props for `<input>` and `<textarea>` elements, in addition to the following custom props:

| Prop        | Type                               | Default     | Description                                                                                                                              |
| ----------- | ---------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `zest`      | `ZestProps`                        | `undefined` | An object containing all custom configurations and behaviors specific to the ZestTextbox component. See `ZestProps` interface for details. |
| `className` | `string`                           | `""`        | A custom CSS class to apply to the main textbox element.                                                                                 |
| `maxLength` | `number`                           | `undefined` | The maximum number of characters allowed. Enables the character counter.                                                               |
| `type`      | `string`                           | `'text'`    | The type of the input element. All standard HTML input types are supported. Special handling is applied for `password` and `number`.     |

## Feature Examples

### Password Input

To create a password input with a visibility toggle, simply set the `type` prop to `"password"`.

```jsx
<ZestTextbox type="password" placeholder="Enter your password" />
```

### Character Counter & Progress Bar

Enable the character counter by setting the `maxLength` prop. You can also enable the progress bar and animated counter for a more engaging experience.

```jsx
<ZestTextbox
  maxLength={280}
  placeholder="What's on your mind?"
  zest={{
    isMultiline: true,
    showProgressBar: true,
    animatedCounter: true,
  }}
/>
```

### Numeric Input

For numeric inputs, set the `type` prop to `"number"`. The component will automatically handle filtering to allow only digits, a single decimal point, and a single leading negative sign.

```jsx
<ZestTextbox type="number" placeholder="Enter a number" />
<ZestTextbox type="number" placeholder="Enter a decimal number" defaultValue="3.14" />
<ZestTextbox type="number" placeholder="Enter a negative number" defaultValue="-100" />
```

### Sizing

The `zSize` prop allows you to control the size of the textbox.

```jsx
<ZestTextbox zest={{ zSize: "sm" }} placeholder="Small" />
<ZestTextbox zest={{ zSize: "md" }} placeholder="Medium (default)" />
<ZestTextbox zest={{ zSize: "lg" }} placeholder="Large" />
```

### Theming

Force the component into a specific theme using the `theme` prop.

```jsx
// Force light mode
<ZestTextbox zest={{ theme: "light" }} placeholder="Light Mode" />

// Force dark mode
<ZestTextbox zest={{ theme: "dark" }} placeholder="Dark Mode" />

// Automatically adapt to system theme (default)
<ZestTextbox zest={{ theme: "system" }} placeholder="System Theme" />
```

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
4.  The internal architecture now includes `UI/hooks`, `UI/components`, and `UI/utils` directories for better organization and separation of concerns.

## License

This project is licensed under the ISC License.