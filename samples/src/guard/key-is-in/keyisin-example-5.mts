// Sample code extracted from src/guard/key-is-in.mts (keyIsIn)
// Comparison with hasKey() - different narrowing behavior:

import { hasKey, keyIsIn } from 'ts-data-forge';

const obj = { x: 10, y: 20 };
const key: string = 'x';

// Using keyIsIn - narrows the key type
if (keyIsIn(key, obj)) {
  // key is now 'x' | 'y'
  const value = obj[key]; // Safe access
}

// Using hasKey - narrows the object type
if (hasKey(obj, key)) {
  // obj type is narrowed to guarantee the key exists
  const value = obj.x; // Direct access
}

export { key, obj };
