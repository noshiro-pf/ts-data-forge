// Sample code extracted from src/guard/is-type.mts (isBoolean)
import { isBoolean } from 'ts-data-forge';

const userInput: unknown = parseInput();

if (isBoolean(userInput)) {
  // userInput is now typed as boolean
  console.log('Boolean value:', userInput ? 'true' : 'false');
}

export { userInput };
