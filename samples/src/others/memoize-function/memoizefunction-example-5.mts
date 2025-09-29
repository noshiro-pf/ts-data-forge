// Example: src/others/memoize-function.mts (memoizeFunction)
// Cache key strategies

import { memoizeFunction } from 'ts-data-forge';

// 1. Simple primitive argument
memoizeFunction(fn, (x: number) => x);

// 2. Multiple arguments with separator
memoizeFunction(fn, (a: string, b: number) => `${a}|${b}`);

// 3. Object with specific fields
memoizeFunction(
  fn,
  (obj: { id: number; version: number }) => `${obj.id}:v${obj.version}`,
);

// 4. Array argument with JSON serialization
memoizeFunction(fn, (arr: number[]) => JSON.stringify(arr));

// 5. Boolean flags as bit field
memoizeFunction(
  fn,
  (a: boolean, b: boolean, c: boolean) =>
    (a ? 4 : 0) | (b ? 2 : 0) | (c ? 1 : 0),
);
