// Example: src/array/array-utils.mts (count)
import { Arr } from 'ts-data-forge';

const words = ['Ada', 'Grace', 'Linus'] as const;

const longWords = Arr.count(words, (word) => word.length > 4);
const withCurried = Arr.count<string>((word) => word.includes('a'))(words);

assert.strictEqual(longWords, 2);
assert.strictEqual(withCurried, 2);
