// Example: src/array/array-utils.mts (min)
import { Arr, Optional } from 'ts-data-forge';

const numberMin = Arr.min([3, 1, 4, 1, 5]);
assert.ok(Optional.isSome(numberMin));
if (Optional.isSome(numberMin)) {
  assert.strictEqual(numberMin.value, 1);
}

const objectMin = Arr.min([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v);
assert.ok(Optional.isSome(objectMin));
if (Optional.isSome(objectMin)) {
  assert.strictEqual(objectMin.value.v, 1);
}

const emptyMin = Arr.min([] as const);
assert.ok(Optional.isNone(emptyMin));
