// Sample code extracted from src/functional/optional.mts (unwrapOr)
import { Optional } from 'ts-data-forge';

// Direct usage - most common pattern
const some = Optional.some(42);
const value1 = Optional.unwrapOr(some, 0);
console.log(value1); // 42

const none = Optional.none;
const value2 = Optional.unwrapOr(none, 0);
console.log(value2); // 0

// Curried usage
const unwrapWithDefault = Optional.unwrapOr('default');
const result = unwrapWithDefault(Optional.some('hello'));
console.log(result); // "hello"

export { none, result, some, unwrapWithDefault, value1, value2 };
