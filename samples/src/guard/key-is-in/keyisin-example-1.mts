// Sample code extracted from src/guard/key-is-in.mts (keyIsIn)
// Basic usage with known object structure:

import { keyIsIn } from 'ts-data-forge';

const obj = { a: 1, b: 2, c: 3 };
const userInput: string = getUserInput(); // Could be any string

if (keyIsIn(userInput, obj)) {
  // userInput is now narrowed to 'a' | 'b' | 'c'
  const value = obj[userInput]; // Type-safe access, value is number
  console.log(`Value for ${userInput}:`, value);
} else {
  console.log(`Key '${userInput}' not found in object`);
}
