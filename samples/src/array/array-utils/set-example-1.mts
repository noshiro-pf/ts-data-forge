// Example: src/array/array-utils.mts (set)
import { Arr } from 'ts-data-forge';

// Basic usage
const tpl = ['a', 'b', 'c'] as const;
const updated = Arr.set(tpl, 1, 'B'); // readonly ['a', 'B', 'c']

// Type changes are reflected
const mixed = [1, 'hello', true] as const;
const withNumber = Arr.set(mixed, 1, 42);
// readonly [1, 42 | 'hello', true]

// Compile-time index validation
const short = [1, 2] as const;
// Arr.set(short, 2, 3); // Error: index 2 is out of bounds

// Different value types
const nums = [1, 2, 3] as const;
const withString = Arr.set(nums, 0, 'first');
// readonly ['first' | 1, 2, 3]

export { mixed, nums, short, tpl, updated, withNumber, withString };
