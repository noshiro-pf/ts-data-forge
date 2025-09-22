// Sample code extracted from src/guard/has-key.mts (hasKey)
// Basic usage with known object structure:

import { hasKey } from 'ts-data-forge';

const obj = { a: 1, b: 'hello' };

if (hasKey(obj, 'a')) {
  // obj is narrowed to guarantee 'a' exists
  console.log(obj.a); // TypeScript knows 'a' exists and is type number
  // No need for optional chaining or undefined checks
}

if (hasKey(obj, 'c')) {
  // This block won't execute at runtime
  console.log(obj.c); // But TypeScript would know 'c' exists if it did
}

export { obj };
