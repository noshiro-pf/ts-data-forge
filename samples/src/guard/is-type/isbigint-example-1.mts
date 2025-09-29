// Example: src/guard/is-type.mts (isBigint)
import { isBigint } from 'ts-data-forge';

const userInput: unknown = parseInput();

if (isBigint(userInput)) {
  // userInput is now typed as bigint
  console.log('BigInt value:', userInput.toString());
  const doubled = userInput * 2n; // Safe bigint operations
}

export { userInput };
