// Example: src/array/array-utils.mts (map)
import { Arr, expectType } from 'ts-data-forge';

// Basic transformation
const nums = [1, 2, 3] as const;
const doubled = Arr.map(nums, (x) => x * 2);
expectType<typeof doubled, readonly [number, number, number]>('=');
assert.deepStrictEqual(doubled, [2, 4, 6]);

const strings = Arr.map(nums, (x) => String(x));
expectType<typeof strings, readonly [string, string, string]>('=');
assert.deepStrictEqual(strings, ['1', '2', '3']);
// With index
const indexed = Arr.map(nums, (x, i) => `${i}:${x}`);
expectType<typeof indexed, readonly [string, string, string]>('=');
assert.deepStrictEqual(indexed, ['0:1', '1:2', '2:3']);

// Mixed type tuples
const mixed = [1, 'hello', true] as const;
const descriptions = Arr.map(mixed, (x) => `Value: ${x}`);
expectType<typeof descriptions, readonly [string, string, string]>('=');
assert.deepStrictEqual(descriptions, [
  'Value: 1',
  'Value: hello',
  'Value: true',
]);
