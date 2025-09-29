// Example: src/others/memoize-function.mts (memoizeFunction)
// Basic memoization for expensive calculations

import { memoizeFunction } from 'ts-data-forge';

// Fibonacci calculation (exponential time complexity)
const fibonacci = (n: number): number => {
  console.log(`Computing fib(${n})`);
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const memoizedFib = memoizeFunction(
  fibonacci,
  (n) => n, // Number itself as key
);

memoizedFib(40); // Much faster than unmemoized version
memoizedFib(40); // Returns instantly from cache

export { fibonacci, memoizedFib };
