// Example: src/array/array-utils.mts (findLastIndex)
import { Arr } from 'ts-data-forge';

const letters = ['a', 'b', 'c', 'b'];

const lastIndexOfB = Arr.findLastIndex(letters, (letter) => letter === 'b');
// eslint-disable-next-line unicorn/prefer-array-index-of
const notFound = Arr.findLastIndex<string>((letter) => letter === 'z')(letters);

assert.strictEqual(lastIndexOfB, 3);
assert.strictEqual(notFound, -1);
