// Example: src/functional/optional.mts (Optional.unwrapOr)
import { Optional } from 'ts-data-forge';

const withValue = Optional.some(5);
const withoutValue = Optional.none as Optional<number>;

assert.strictEqual(Optional.unwrapOr(withValue, 0), 5);
assert.strictEqual(Optional.unwrapOr(withoutValue, 0), 0);

const unwrapWithDefault = Optional.unwrapOr(10);

assert.strictEqual(unwrapWithDefault(Optional.some(3)), 3);
assert.strictEqual(unwrapWithDefault(Optional.none), 10);
