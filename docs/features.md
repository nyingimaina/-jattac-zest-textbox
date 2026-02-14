# Features

`ZestTextbox` isn't just another input field; it's crafted to bring a smile to your users' faces while providing robust functionality and a seamless developer experience.

*   **Responsive and Mobile-First:** Adapts beautifully to any screen size, ensuring a consistent UX.
    *   Uses `rem` units for accessible and scalable sizing.
    *   Supports full-width stretching with `zest={{ stretch: true }}`.
*   **Light & Dark Mode:** Automatically respects user system preferences or can be explicitly set.
    *   Set a specific theme with `zest={{ theme: "light" | "dark" }}`.
    *   Defaults to `system` to match the user's OS preference.
*   **Password Visibility Toggle:** A crucial accessibility and usability feature for password fields.
    *   Automatically enabled for `type="password"`.
    *   Includes a tooltip for better user guidance.
*   **Character Counter & Progress Bar:** Visual feedback on input length, with engaging animations as limits are approached.
    *   Enabled by setting the `maxLength` prop.
    *   `zest={{ showProgressBar: true }}` displays a progress bar.
    *   `zest={{ animatedCounter: true }}` adds color-coded feedback to the counter.
*   **Enhanced Numeric Input:** Intelligent filtering for numbers, decimals, and negative values.
    *   Activated for `type="number"`, `type="currency"`, and `type="percentage"`.
    *   Prevents invalid characters from being entered.
*   **Customizable Parsing & Validation:** Define how raw string input is converted to a desired type and validated, with context of the input `type`.
    *   The `parser` prop converts the raw string to any desired type.
    *   The `validator` prop checks the parsed value and can return an error message.
    *   Both can be set globally using the [Centralized Configuration](./configuration.md).
*   **Engaging Animations:** Subtle, delightful micro-interactions on focus and input.
    *   Pulse animation on focus.
    *   Smooth transitions for helper text and progress bar.
*   **Accessible:** Built with `rem` units and best practices for inclusivity.
    *   Proper use of `aria-` attributes where applicable.
    *   Keyboard navigable.
*   **Centralized Configuration:** Easily manage default behaviors and styles across your application using React Context.
    *   Define global defaults for any `ZestProps`.
    *   Create type-aware configurations that change based on `inputType`.
    *   Supports asynchronous configuration values.