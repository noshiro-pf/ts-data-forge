// Example: src/functional/optional.mts (zip)
import { Optional } from 'ts-data-forge';

const a = Optional.some(1);
const b = Optional.some('hello');
const zipped = Optional.zip(a, b);
console.log(Optional.unwrap(zipped)); // [1, "hello"]

const withNone = Optional.zip(a, Optional.none);
console.log(Optional.isNone(withNone)); // true

export { a, b, withNone, zipped };
