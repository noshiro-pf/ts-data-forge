// Example: src/array/array-utils.mts (eq)
import { Arr } from 'ts-data-forge';

const numbers = [1, 2, 3] as const;
const sameNumbers = [1, 2, 3] as const;
const differentNumbers = [1, 2, 4] as const;

assert.ok(Arr.eq(numbers, sameNumbers));
assert.notOk(Arr.eq(numbers, differentNumbers));
