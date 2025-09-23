// Example: src/functional/optional.mts (Optional.zip)
import { Optional } from 'ts-data-forge';

const zipped = Optional.zip(Optional.some('left'), Optional.some(1));

assert.strictEqual(Optional.isSome(zipped), true);
if (Optional.isSome(zipped)) {
  const expected: readonly [string, number] = ['left', 1];
  assert.deepStrictEqual(zipped.value, expected);
}

const missing = Optional.zip(
  Optional.some('value'),
  Optional.none as Optional<number>,
);

assert.deepStrictEqual(missing, Optional.none);
