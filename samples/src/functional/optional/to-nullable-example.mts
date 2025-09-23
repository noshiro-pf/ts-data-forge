// Example: src/functional/optional.mts (Optional.toNullable)
import { Optional } from 'ts-data-forge';

const someNumber = Optional.some(42);
const noneNumber = Optional.none as Optional<number>;

assert.strictEqual(Optional.toNullable(someNumber), 42);
assert.strictEqual(Optional.toNullable(noneNumber), undefined);
