export const filterNumericInput = (value: string): string => {
  // Allow digits, a single leading hyphen, and a single decimal point
  const parts = value.split('.');
  let integerPart = parts[0].replace(/[^0-9-]/g, '');
  let decimalPart = parts.length > 1 ? '.' + parts[1].replace(/[^0-9]/g, '') : '';

  // Ensure only one leading hyphen
  if (integerPart.startsWith('-')) {
    integerPart = '-' + integerPart.substring(1).replace(/-/g, '');
  } else {
    integerPart = integerPart.replace(/-/g, '');
  }

  let newValue = integerPart + decimalPart;

  // Prevent multiple decimal points
  if (newValue.indexOf('.') !== -1 && newValue.indexOf('.') !== newValue.lastIndexOf('.')) {
    newValue = newValue.substring(0, newValue.lastIndexOf('.'));
  }

  return newValue;
};
