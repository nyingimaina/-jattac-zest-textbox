// A simplified deep equality check for plain objects, arrays, and primitives.
// Not meant for complex objects like Dates, RegExps, Maps, Sets, or functions.
// This is sufficient for comparing simple config objects that primarily hold primitives,
// simple objects, and *memoized* functions (where reference equality is enough for functions).
export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (a.constructor !== b.constructor) return false;

    let length = Object.keys(a).length;
    if (length !== Object.keys(b).length) return false;

    for (const key in a) {
      if (Object.prototype.hasOwnProperty.call(a, key)) {
        if (!Object.prototype.hasOwnProperty.call(b, key) || !deepEqual(a[key], b[key])) {
          return false;
        }
      }
    }
    return true;
  }

  // Treat functions as equal if their references are the same (already handled by a === b)
  // Otherwise, if they are different functions or non-object types, they are not equal.
  return a !== a && b !== b; // Handle NaN === NaN case
}
