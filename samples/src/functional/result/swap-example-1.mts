// Sample code extracted from src/functional/result.mts (swap)
import { Result } from 'ts-data-forge';

const okResult = Result.ok(42);
const swapped = Result.swap(okResult);
console.log(Result.isErr(swapped)); // true
console.log(Result.unwrapErr(swapped)); // 42

export { okResult, swapped };
