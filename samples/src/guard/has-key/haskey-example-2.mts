// Sample code extracted from src/guard/has-key.mts (hasKey)
// Working with dynamic objects and unknown keys:

import { hasKey } from 'ts-data-forge';

const dynamicObj: Record<string, unknown> = { x: 10, y: 20 };
const userInput: string = getUserInput();

if (hasKey(dynamicObj, userInput)) {
  // Safe to access the dynamic key
  const value = dynamicObj[userInput]; // Type: unknown
  console.log(`Value for ${userInput}:`, value);
} else {
  console.log(`Key '${userInput}' not found`);
}

export { dynamicObj, userInput };
