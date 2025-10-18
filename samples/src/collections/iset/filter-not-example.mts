// Example: src/collections/iset.mts (filterNot)
import { ISet } from 'ts-data-forge';

// embed-sample-code-ignore-above
const numbers = ISet.create([1, 2, 3, 4]);

const withoutEven = numbers.filterNot((value) => value % 2 === 0);

assert.deepStrictEqual(Array.from(withoutEven), [1, 3]);
