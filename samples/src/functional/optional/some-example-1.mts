// Example: src/functional/optional.mts (some)
import { Optional } from 'ts-data-forge';

const someValue = Optional.some(42);
console.log(Optional.isSome(someValue)); // true
console.log(Optional.unwrap(someValue)); // 42

export { someValue };
