// Example: src/array/array-utils.mts (at)
import { Arr, Optional } from 'ts-data-forge';

const fruits = ['apple', 'banana', 'cherry', 'date'] as const;
const empty: readonly string[] = [];

const first = Arr.at(fruits, 0);
const last = Arr.at(fruits, -1);
const missing = Arr.at(empty, 0);

assert(Optional.isSome(first));
assert.strictEqual(first.value, 'apple');

assert(Optional.isSome(last));
assert.strictEqual(last.value, 'date');

assert(Optional.isNone(missing));

const fallbackLast = Optional.unwrapOr(last, 'unknown');

assert.strictEqual(fallbackLast, 'date');

const getSecond = Arr.at(1);
const second = Optional.unwrapOr(getSecond(fruits), 'unknown');

assert.strictEqual(second, 'banana');
