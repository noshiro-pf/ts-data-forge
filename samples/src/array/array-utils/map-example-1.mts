// Example: src/array/array-utils.mts (map)
import { Arr } from 'ts-data-forge';

// Basic transformation
const nums = [1, 2, 3] as const;
const doubled = Arr.map(nums, (x) => x * 2); // readonly [2, 4, 6]
const strings = Arr.map(nums, (x) => String(x)); // readonly ['1', '2', '3']

// With index
const indexed = Arr.map(nums, (x, i) => `${i}:${x}`);
// readonly ['0:1', '1:2', '2:3']

// Mixed type tuples
const mixed = [1, 'hello', true] as const;
const descriptions = Arr.map(mixed, (x) => `Value: ${x}`);
// readonly ['Value: 1', 'Value: hello', 'Value: true']

export { descriptions, doubled, indexed, mixed, nums, strings };
