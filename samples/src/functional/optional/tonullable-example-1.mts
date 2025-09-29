// Example: src/functional/optional.mts (toNullable)
import { Optional } from 'ts-data-forge';

const some = Optional.some(42);
console.log(Optional.toNullable(some)); // 42

const none = Optional.none;
console.log(Optional.toNullable(none)); // undefined

export { none, some };
