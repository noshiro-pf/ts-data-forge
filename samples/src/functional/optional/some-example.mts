// Example: src/functional/optional.mts (Optional.some / Optional.none)
import { Optional } from 'ts-data-forge';

const someValue = Optional.some({ id: 1 });
const noneValue = Optional.none;

assert.strictEqual(Optional.isSome(someValue), true);
assert.strictEqual(Optional.isNone(noneValue), true);
