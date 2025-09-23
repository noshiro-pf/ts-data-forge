// Example: src/array/array-utils.mts (toReversed)
import { Arr, expectType } from 'ts-data-forge';

// Basic reversal
const nums = [1, 2, 3] as const;
const reversed = Arr.toReversed(nums);
expectType<typeof reversed, readonly [3, 2, 1]>('=');
assert.deepStrictEqual(reversed, [3, 2, 1]);

// Mixed types preserved in reverse positions
const mixed = [1, 'hello', true, null] as const;
const revMixed = Arr.toReversed(mixed);
expectType<typeof revMixed, readonly [null, true, 'hello', 1]>('=');
assert.deepStrictEqual(revMixed, [null, true, 'hello', 1]);

// Empty and single-element tuples
const empty = [] as const;
const revEmpty = Arr.toReversed(empty);
expectType<typeof revEmpty, readonly []>('=');
assert.deepStrictEqual(revEmpty, []);
const single = [42] as const;
const revSingle = Arr.toReversed(single);
expectType<typeof revSingle, readonly [42]>('=');
assert.deepStrictEqual(revSingle, [42]);
