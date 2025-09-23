// Example: src/array/array-utils.mts (flatMap)
import { Arr, expectType } from 'ts-data-forge';

// Direct usage
const words = ['hello', 'world'];
const chars = Arr.flatMap(words, (word) => word.split(''));
expectType<typeof chars, readonly string[]>('=');
assert.deepStrictEqual(chars, [
  'h',
  'e',
  'l',
  'l',
  'o',
  'w',
  'o',
  'r',
  'l',
  'd',
]);

// Curried usage
const splitWords = Arr.flatMap((word: string) => word.split(''));
const result = splitWords(['foo', 'bar']);
expectType<typeof result, readonly string[]>('=');
assert.deepStrictEqual(result, ['f', 'o', 'o', 'b', 'a', 'r']);

// With numbers
const numbers = [1, 2, 3];
const doubled = Arr.flatMap(numbers, (n) => [n, n * 2]);
expectType<typeof doubled, readonly number[]>('=');
assert.deepStrictEqual(doubled, [1, 2, 2, 4, 3, 6]);
