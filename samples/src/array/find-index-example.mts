// Example: src/array/array-utils.mts (findIndex)
import { Arr } from 'ts-data-forge';

// embed-sample-code-ignore-above
const letters = ['a', 'b', 'c'];

const indexOfB = Arr.findIndex(letters, (letter) => letter === 'b');
// eslint-disable-next-line unicorn/prefer-array-index-of
const indexOfMissing = Arr.findIndex<string>((letter) => letter === 'z')(
  letters,
);

assert(indexOfB === 1);
assert(indexOfMissing === -1);
