// Example: src/functional/optional.mts (Optional.isSome)
import { Optional } from 'ts-data-forge';

const optionalNumber = Optional.some(42);

if (Optional.isSome(optionalNumber)) {
  const value: number = optionalNumber.value;
  assert.strictEqual(value, 42);
}
