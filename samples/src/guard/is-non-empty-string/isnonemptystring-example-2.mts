// Sample code extracted from src/guard/is-non-empty-string.mts (isNonEmptyString)
// Type guard usage with nullable strings:

import { isNonEmptyString } from 'ts-data-forge';

const userInput: string | null | undefined = getUserInput();

if (isNonEmptyString(userInput)) {
  // userInput is now typed as non-empty string
  console.log(userInput.charAt(0)); // Safe to access string methods
  console.log(userInput.toUpperCase()); // No need for null checks
  const length = userInput.length; // Guaranteed to be > 0
} else {
  console.log('No valid input provided');
}
