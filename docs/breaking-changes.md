# Breaking Changes

## 0.1.7 - Encapsulation of Custom Props into `zest` Object

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
