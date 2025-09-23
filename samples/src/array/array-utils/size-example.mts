// Example: src/array/array-utils.mts (size)
import { Arr } from 'ts-data-forge';

const numbers = [1, 2, 3] as const;
const letters: string[] = [];

const sizeOfNumbers = Arr.size(numbers);
const sizeOfLetters = Arr.size(letters);

assert.strictEqual(sizeOfNumbers, 3);
assert.strictEqual(sizeOfLetters, 0);
