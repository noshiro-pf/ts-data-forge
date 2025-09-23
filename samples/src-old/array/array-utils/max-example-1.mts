// Example: src/array/array-utils.mts (max)
import { Arr, Optional } from 'ts-data-forge';

const numberMax = Arr.max([3, 1, 4, 1, 5]);
assert.ok(Optional.isSome(numberMax));
if (Optional.isSome(numberMax)) {
  assert.strictEqual(numberMax.value, 5);
}

const objectMax = Arr.max([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v);
assert.ok(Optional.isSome(objectMax));
if (Optional.isSome(objectMax)) {
  assert.strictEqual(objectMax.value.v, 3);
}

const emptyMax = Arr.max([] as const);
assert.ok(Optional.isNone(emptyMax));
