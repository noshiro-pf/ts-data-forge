// Sample code extracted from src/functional/result.mts (map)
import { Result, pipe } from 'ts-data-forge';

// Regular usage
const result = Result.ok(5);
const mapped = Result.map(result, (x) => x * 2);
console.log(Result.unwrap(mapped)); // 10

// Curried version for use with pipe
const doubler = Result.map((x: number) => x * 2);
const result2 = pipe(Result.ok(5)).map(doubler).value;
console.log(Result.unwrap(result2)); // 10
