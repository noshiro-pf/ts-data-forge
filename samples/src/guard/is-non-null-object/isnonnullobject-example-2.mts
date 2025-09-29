// Example: src/guard/is-non-null-object.mts (isNonNullObject)
// Type guard usage with unknown values:

import { isNonNullObject } from 'ts-data-forge';

const value: unknown = parseJsonData();

if (isNonNullObject(value)) {
  // value is now typed as object
  console.log('Value is an object');

  // You can now safely use object-specific operations
  console.log(Object.keys(value)); // Safe to call Object.keys
  console.log(value.toString()); // Safe to call methods

  // But you may need additional checks for specific object types
  if (Array.isArray(value)) {
    console.log("It's an array with length:", value.length);
  }
} else {
  console.log('Value is not an object');
}

export { value };
