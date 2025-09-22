// Sample code extracted from src/guard/is-type.mts (isSymbol)
import { isSymbol } from 'ts-data-forge';

const userInput: unknown = parseInput();

if (isSymbol(userInput)) {
  // userInput is now typed as symbol
  console.log('Symbol description:', userInput.description);
  console.log('Symbol string:', userInput.toString());
}

export { userInput };
