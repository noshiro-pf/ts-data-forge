// Example: src/array/array-utils.mts (flatMap)
import { Arr } from 'ts-data-forge';

// Direct usage
const words = ['hello', 'world'];
const chars = Arr.flatMap(words, (word) => word.split('')); // ['h','e','l','l','o','w','o','r','l','d']

// Curried usage
const splitWords = Arr.flatMap((word: string) => word.split(''));
const result = splitWords(['foo', 'bar']); // ['f','o','o','b','a','r']

// With numbers
const numbers = [1, 2, 3];
const doubled = Arr.flatMap(numbers, (n) => [n, n * 2]); // [1, 2, 2, 4, 3, 6]

export { chars, doubled, numbers, result, splitWords, words };
