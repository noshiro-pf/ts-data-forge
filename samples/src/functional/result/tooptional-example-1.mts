// Sample code extracted from src/functional/result.mts (toOptional)
import { Optional, Result } from 'ts-data-forge';

// Basic conversion
const okResult = Result.ok(42);
const optional = Result.toOptional(okResult);
console.log(Optional.isSome(optional)); // true
console.log(Optional.unwrap(optional)); // 42

const errResult = Result.err('Network error');
const none = Result.toOptional(errResult);
console.log(Optional.isNone(none)); // true

export { errResult, none, okResult, optional };
