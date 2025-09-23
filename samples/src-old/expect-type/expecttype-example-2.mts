// Example: src/expect-type.mts
import { Arr, expectType } from 'ts-data-forge';

const zeros = Arr.zeros(3);
const sequence = Arr.seq(5);

expectType<typeof zeros, readonly [0, 0, 0]>('=');
expectType<typeof sequence, readonly [0, 1, 2, 3, 4]>('=');

assert.deepStrictEqual(sequence, [0, 1, 2, 3, 4]);
assert.deepStrictEqual(zeros, [0, 0, 0]);
