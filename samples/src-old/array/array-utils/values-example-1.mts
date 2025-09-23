// Example: src/array/array-utils.mts (values)
import { Arr, expectType } from 'ts-data-forge';

// Direct usage
const numbers = [1, 2, 3] as const;
const values = Array.from(Arr.values(numbers));
expectType<typeof values, (1 | 2 | 3)[]>('=');
assert.deepStrictEqual(values, [1, 2, 3]);
