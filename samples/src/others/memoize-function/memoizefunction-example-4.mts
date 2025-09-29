// Example: src/others/memoize-function.mts (memoizeFunction)
// Memoizing recursive functions

import { memoizeFunction } from 'ts-data-forge';

// Recursive path finding
const findPaths = (
  start: string,
  end: string,
  visited: Set<string> = new Set(),
): string[][] => {
  if (start === end) return [[end]];
  // ... complex recursive logic
};

// Use sorted, serialized visited set for consistent keys
const memoizedFindPaths = memoizeFunction(
  findPaths,
  (start, end, visited = new Set()) =>
    `${start}->${end}:[${[...visited].toSorted().join(',')}]`,
);

export { findPaths, memoizedFindPaths };
