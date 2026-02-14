# Internal Architecture

The `ZestTextbox` component has been refactored internally for improved maintainability, readability, and reusability. Its core logic is now distributed across several custom React hooks and smaller, focused sub-components. This internal restructuring does **not** introduce any breaking changes to the public API.

The internal structure now includes:
*   `UI/hooks/`: Contains custom React hooks (e.g., `useThemeDetector`, `usePasswordVisibility`, `useCharacterCounter`, `useHelperText`, `useZestTextboxConfig`, `useParsedAndValidatedInput`).
*   `UI/components/`: Contains smaller, focused UI components (e.g., `PasswordToggleButton`, `CharacterCounter`, `ProgressBar`, `HelperTextDisplay`).
*   `UI/utils/`: Contains utility functions (e.g., `numericInputFilter`, `defaultParsersAndValidators`).
*   `UI/types.ts`: Defines shared TypeScript interfaces and types (e.g., `HtmlInputType`, `InputParser`, `InputValidator`, `ZestConfigValue`, `ResolvedZestProps`).
*   `UI/contexts/`: Contains React Contexts and Providers (e.g., `ZestTextboxConfigContext`, `ZestTextboxConfigProvider`).

# Contributing

Contributions are welcome! If you have a feature request, bug report, or pull request, please feel free to open an issue or submit a PR.

## Development Setup

1.  Clone the repository.
2.  Install dependencies with `npm install`.
3.  Run the build with `npm run build`.
4.  The internal architecture now includes `UI/hooks`, `UI/components`, `UI/utils`, and `UI/contexts` directories for better organization and separation of concerns.
