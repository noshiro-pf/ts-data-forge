// Example: src/array/array-utils.mts (some)
import { Arr } from 'ts-data-forge';

const numbers = [1, 3, 5] as const;
const words = ['Ada', 'Grace'] as const;

const hasEven = Arr.some(numbers, (value) => value % 2 === 0);
const hasShortName = Arr.some(words, (value) => value.length <= 3);

assert.strictEqual(hasEven, false);
assert.strictEqual(hasShortName, true);
