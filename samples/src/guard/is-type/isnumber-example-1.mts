// Sample code extracted from src/guard/is-type.mts (isNumber)
import { isNumber } from 'ts-data-forge';

const userInput: unknown = parseInput();

if (isNumber(userInput)) {
  // userInput is now typed as number
  console.log('Number value:', userInput.toFixed(2));

  // Note: this includes NaN and Infinity
  if (Number.isFinite(userInput)) {
    console.log('Finite number:', userInput);
  }
}
