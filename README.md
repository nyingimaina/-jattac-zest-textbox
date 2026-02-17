# jattac.libs.web.zest-textbox

A delightful, feature-rich, and highly customizable React textbox component. Built with accessibility and developer experience in mind.

## Introduction

`ZestTextbox` is a standalone component that extends the standard HTML `<input>` and `<textarea>` elements with a touch of zest, providing a polished, professional, and playful user experience. It aims to simplify the creation of robust and user-friendly input fields in your React applications.

## Key Features

*   **Playful & Corporate Design:** A unique balance of aesthetic appeal and professional functionality, ensuring a delightful user experience.
*   **Centralized Configuration:** Effortlessly manage default behaviors and appearances across all `ZestTextbox` instances using a powerful context-based configuration system.
*   **Real-time Character Counter:** Provides instant visual feedback on input length, optionally with engaging animations.
*   **Dynamic Helper Text:** Display context-aware messages, validation errors, or informational tips that adapt to user input.
*   **Password Visibility Toggle:** Enhance security and usability for password fields with an integrated show/hide mechanism.
*   **Type-Safe Input Parsing & Validation:** Define custom logic to parse and validate user input, ensuring data integrity and providing clear feedback.
*   **Visual Progress Bar:** An intuitive progress indicator that can be linked to character limits or other input metrics.
*   **Theme Awareness:** Seamlessly integrates with system themes (light/dark) or allows for explicit theme control.
*   **Responsive Sizing & Layout:** Control the size and stretching behavior of the component to fit various design needs.

## Installation

To install `jattac.libs.web.zest-textbox` in your project, run:

```bash
npm install jattac.libs.web.zest-textbox
```

## Basic Usage (Hello World)

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

## Next Steps: Documentation Overview

Dive deeper into `ZestTextbox` to unleash its full potential. Our documentation is structured to guide you from basic usage to advanced customization.

<!-- DOCUMENTATION_TOC_START -->
*   [The Cookbook: Step-by-Step Examples](./docs/examples.md) - Your primary guide to building amazing things with ZestTextbox.
*   [Features Showcase](./docs/features.md) - A quick overview of what ZestTextbox can do.
*   [API Reference](./docs/api.md) - Detailed documentation for all props and types.
*   [Centralized Configuration](./docs/configuration.md) - Learn how to configure ZestTextbox globally.
*   [Development & Contributing](./docs/development.md) - How to contribute to the project.
*   [Best Practices & Developer Insights](./docs/best-practices.md) - Essential tips for performance and stability.
*   [Breaking Changes](./docs/breaking-changes.md) - Information about upgrading to new versions.
*   [License](./docs/license.md) - Project licensing information.
<!-- DOCUMENTATION_TOC_END -->

---

[Next: The Cookbook](./docs/examples.md)
