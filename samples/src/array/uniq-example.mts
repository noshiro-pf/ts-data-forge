// Example: src/array/array-utils.mts (uniq)
import { Arr } from 'ts-data-forge';

// embed-sample-code-ignore-above
const letters = ['a', 'b', 'a', 'c', 'b'] as const;

const uniqueLetters = Arr.uniq(letters);

const expected = ['a', 'b', 'c'] as const;

assert.deepStrictEqual(uniqueLetters, expected);
