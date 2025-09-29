// Example: src/array/array-utils.mts (toReversed)
import { Arr } from 'ts-data-forge';

// Basic reversal
const nums = [1, 2, 3] as const;
const reversed = Arr.toReversed(nums); // readonly [3, 2, 1]

// Mixed types preserved in reverse positions
const mixed = [1, 'hello', true, null] as const;
const revMixed = Arr.toReversed(mixed);
// readonly [null, true, 'hello', 1]

// Empty and single-element tuples
const empty = [] as const;
const revEmpty = Arr.toReversed(empty); // readonly []
const single = [42] as const;
const revSingle = Arr.toReversed(single); // readonly [42]

export { empty, mixed, nums, revEmpty, reversed, revMixed, revSingle, single };
