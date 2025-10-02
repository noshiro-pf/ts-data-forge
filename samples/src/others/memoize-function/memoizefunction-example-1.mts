// Example: src/others/memoize-function.mts
import { memoizeFunction } from 'ts-data-forge';

const memoizedSquare = memoizeFunction(
  (value: number) => value * value,
  (value) => value,
);

const firstCall = memoizedSquare(4);
const cachedCall = memoizedSquare(4);

const summary = {
  cachedCall,
  firstCall,
};

// embed-sample-code-ignore-below
export { summary };
