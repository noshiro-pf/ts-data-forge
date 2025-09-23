// Example: src/array/array-utils.mts (flat)
import { Arr, SafeUint, expectType } from 'ts-data-forge';

// Direct usage
const nested = [1, [2, [3, 4]], 5];
const flat1 = Arr.flat(nested, 1);
expectType<typeof flat1, readonly (number | number[])[]>('=');
assert.deepStrictEqual(flat1, [1, 2, [3, 4], 5]);
const flat2 = Arr.flat(nested, 2);
expectType<typeof flat2, readonly number[]>('=');
assert.deepStrictEqual(flat2, [1, 2, 3, 4, 5]);

// Curried usage
const flattenOnceLevel = Arr.flat();
const result = flattenOnceLevel([
  [1, 2],
  [3, 4],
]);
expectType<typeof result, readonly (1 | 2 | 3 | 4)[]>('=');
assert.deepStrictEqual(result, [1, 2, 3, 4]);

// Flatten all levels
const deepNested = [1, [2, [3, [4, 5]]]];
const allFlat = Arr.flat(deepNested, SafeUint.MAX_VALUE);
expectType<
  typeof allFlat,
  readonly FlatArray<
    number | (number | (number | number[])[])[],
    0 | 1 | 2 | 3 | 4 | -1
  >[]
>('=');
assert.deepStrictEqual(allFlat, [1, 2, 3, 4, 5]);
