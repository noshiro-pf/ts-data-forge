// Example: src/functional/optional.mts (Optional.isNone)
import { Optional } from 'ts-data-forge';

const optionalValue = Optional.none as Optional<number>;

if (Optional.isNone(optionalValue)) {
  assert.strictEqual(
    optionalValue.$$tag === 'ts-data-forge::Optional.none',
    true,
  );
}
