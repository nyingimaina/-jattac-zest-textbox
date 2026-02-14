# jattac.libs.web.zest-textbox

A delightful, feature-rich, and highly customizable React textbox component. Built with accessibility and developer experience in mind.

`ZestTextbox` is a standalone component that extends the standard HTML `<input>` and `<textarea>` elements with a touch of zest, providing a polished, professional, and playful user experience.

## Documentation

- [Features](./docs/features.md)
- [Props API](./docs/api.md)
- [Feature Examples](./docs/examples.md)
- [Centralized Configuration](./docs/configuration.md)
- [Development & Contributing](./docs/development.md)
- [Breaking Changes](./docs/breaking-changes.md)
- [License](./docs/license.md)

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