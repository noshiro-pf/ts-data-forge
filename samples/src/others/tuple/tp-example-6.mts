// Sample code extracted from src/others/tuple.mts (tp)
// Integration with other utilities

import { Result, pipe, tp } from 'ts-data-forge';

// Type-safe error handling
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return Result.err('Division by zero');
  return Result.ok(a / b);
}

const calculation = tp(10, 2);
const result = divide(...calculation); // Spread tuple as arguments

// Building pipelines with tuples
const pipeline = pipe(tp(5, 10))
  .map(([a, b]) => tp(a + b, a * b))
  .map(([sum, product]) => tp('sum', sum, 'product', product)).value;
// Type: readonly ['sum', 15, 'product', 50]
