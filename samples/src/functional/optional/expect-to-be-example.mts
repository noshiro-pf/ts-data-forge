// Example: src/functional/optional.mts (Optional.expectToBe)
import { Optional } from 'ts-data-forge';

const optionalValue = Optional.some('data');

assert.strictEqual(
  Optional.expectToBe(optionalValue, 'value expected'),
  'data',
);

const expectValue = Optional.expectToBe<string>('missing optional');

assert.throws(() => expectValue(Optional.none), /missing optional/);
assert.strictEqual(expectValue(Optional.some('present')), 'present');
