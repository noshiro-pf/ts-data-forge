// Example: src/array/array-utils.mts (last)
import { Arr, Optional } from 'ts-data-forge';

const empty = Arr.last([]);
const tupleLast = Arr.last(['first', 'last'] as const);
const numbers: readonly number[] = [10, 20, 30];
const maybeNumber = Arr.last(numbers);

const lastNumber = Optional.unwrapOr(maybeNumber, 0);

const nested = [[1], [], [2, 3]] as const;
const available = nested.map(Arr.last).filter(Optional.isSome);

assert.deepStrictEqual(available, [Optional.some(1), Optional.some(3)]);
assert.deepStrictEqual(empty, Optional.none);
assert.strictEqual(lastNumber, 30);
assert.deepStrictEqual(maybeNumber, Optional.some(30));
assert.deepStrictEqual(numbers, [10, 20, 30]);
assert.deepStrictEqual(tupleLast, Optional.some('last'));
