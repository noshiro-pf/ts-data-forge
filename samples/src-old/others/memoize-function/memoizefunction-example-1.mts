// Example: src/others/memoize-function.mts
import { memoizeFunction } from 'ts-data-forge';

const memoizedSquare = memoizeFunction(
  (value: number) => value * value,
  (value) => value,
);

const firstCall = memoizedSquare(4);
const cachedCall = memoizedSquare(4);

assert.strictEqual(cachedCall, 16);
assert.strictEqual(firstCall, 16);
