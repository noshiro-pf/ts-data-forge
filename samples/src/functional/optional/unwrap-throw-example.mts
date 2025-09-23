// Example: src/functional/optional.mts (Optional.unwrapThrow)
import { Optional } from 'ts-data-forge';

const present = Optional.some('available');

assert.strictEqual(Optional.unwrapThrow(present), 'available');
assert.throws(
  () => Optional.unwrapThrow(Optional.none),
  /has failed because it is `None`/,
);
