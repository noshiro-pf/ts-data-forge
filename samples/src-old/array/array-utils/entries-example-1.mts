// Example: src/array/array-utils.mts (entries)
import { Arr, asUint32, expectType } from 'ts-data-forge';

// Direct usage
const fruits = ['apple', 'banana', 'cherry'];
const entries = Arr.entries(fruits);
const entriesList = Array.from(entries);
expectType<typeof entriesList, (readonly [Uint32, string])[]>('=');
assert.deepStrictEqual(entriesList, [
  [asUint32(0), 'apple'],
  [asUint32(1), 'banana'],
  [asUint32(2), 'cherry'],
]);

// With tuples
const tuple = [10, 20, 30] as const;
const tupleEntries = Arr.entries(tuple);
const tupleEntryList = Array.from(tupleEntries);
expectType<typeof tupleEntryList, (readonly [Uint32, 10 | 20 | 30])[]>('=');
assert.deepStrictEqual(tupleEntryList, [
  [asUint32(0), 10],
  [asUint32(1), 20],
  [asUint32(2), 30],
]);
