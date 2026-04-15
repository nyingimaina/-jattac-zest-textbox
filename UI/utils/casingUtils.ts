import { CasingBehaviour } from "../types";

/**
 * Applies the given casing behaviour to a string value.
 * Called on every input change to enforce live casing transforms.
 */
export function applyCasing(value: string, behaviour: CasingBehaviour): string {
  switch (behaviour) {
    case "UpperCase":
      return value.toUpperCase();

    case "LowerCase":
      return value.toLowerCase();

    case "SentenceCase":
      // Capitalize the first character after the start of the string, or after
      // a sentence-ending punctuation mark (. ! ?) followed by optional whitespace.
      // Newlines are also treated as sentence boundaries.
      return value.replace(
        /(^|[.!?\n]\s*)([a-zA-Z])/g,
        (_, boundary, char) => boundary + char.toUpperCase()
      );

    case "TitleCase":
      // Capitalize the first letter of every word. Spaces are preserved.
      return value.replace(/\b([a-zA-Z])/g, char => char.toUpperCase());

    case "PascalCase":
      // Split on whitespace, capitalize the first letter of each word,
      // then join without spaces. Subsequent letters in each word are lowercased.
      // NOTE: spaces are removed as the user types — best suited for identifier fields.
      return value
        .split(/\s+/)
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join("");

    case "SnakeCase":
      // Lowercase all characters and replace any run of whitespace with a single underscore.
      // NOTE: spaces become underscores on each keystroke — best suited for slug/identifier fields.
      return value.toLowerCase().replace(/\s+/g, "_");

    default:
      return value;
  }
}

/**
 * For PascalCase transforms (which remove spaces and shorten the string), calculates
 * the correct cursor position in the transformed string corresponding to `cursorPos`
 * in the original string.
 *
 * For all other casing transforms the string length is unchanged, so no cursor
 * adjustment is needed.
 *
 * @param original - The untransformed string value.
 * @param cursorPos - The cursor position in the original string.
 * @returns The adjusted cursor position for the transformed (PascalCase) string.
 */
export function adjustedCursorPos(original: string, cursorPos: number): number {
  // Count how many spaces existed before the cursor in the original string.
  // PascalCase removes all spaces, so each one shifts the cursor left by 1.
  let spacesBeforeCursor = 0;
  for (let i = 0; i < cursorPos && i < original.length; i++) {
    if (original[i] === " ") spacesBeforeCursor++;
  }
  return Math.max(0, cursorPos - spacesBeforeCursor);
}
