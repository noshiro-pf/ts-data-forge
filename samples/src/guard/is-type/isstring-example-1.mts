// Sample code extracted from src/guard/is-type.mts (isString)
import { isString } from 'ts-data-forge';

const userInput: unknown = parseInput();

if (isString(userInput)) {
  // userInput is now typed as string
  console.log('String length:', userInput.length);
  console.log('Uppercase:', userInput.toUpperCase());

  // You can further check for non-empty strings
  if (userInput.length > 0) {
    console.log('Non-empty string:', userInput);
  }
}
