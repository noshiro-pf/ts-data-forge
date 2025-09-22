// Sample code extracted from src/array/array-utils.mts (copy)
import { Arr } from 'ts-data-forge';

// Mutable arrays remain mutable
const mutableOriginal = [1, 2, 3];
const mutableCopy = Arr.copy(mutableOriginal); // number[]
mutableCopy[0] = 999; // OK - still mutable
mutableOriginal[0]; // 1 - original unchanged

// Readonly arrays remain readonly
const readonlyOriginal = [1, 2, 3] as const;
const readonlyCopy = Arr.copy(readonlyOriginal); // readonly [1, 2, 3]
// readonlyCopy[0] = 999; // Error - readonly array

// Tuple types are preserved
const tupleOriginal: [string, number, boolean] = ['hello', 42, true];
const tupleCopy = Arr.copy(tupleOriginal); // [string, number, boolean]

// Shallow copy behavior with objects
const objectArray = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const objectCopy = Arr.copy(objectArray);
objectCopy[0].name = 'Charlie'; // Mutates the shared object reference
console.log(objectArray[0].name); // 'Charlie' - original affected
objectCopy.push({ id: 3, name: 'Dave' }); // Array structure changes don't affect original
console.log(objectArray.length); // 2 - original array length unchanged

// Empty arrays
const emptyArray: number[] = [];
const emptyCopy = Arr.copy(emptyArray); // number[]
const emptyTuple = [] as const;
const emptyTupleCopy = Arr.copy(emptyTuple); // readonly []

// Type inference examples
expectType<typeof mutableCopy, number[]>('=');
expectType<typeof readonlyCopy, readonly [1, 2, 3]>('=');
expectType<typeof tupleCopy, [string, number, boolean]>('=');

export { emptyArray, emptyCopy, emptyTuple, emptyTupleCopy, mutableCopy, mutableOriginal, objectArray, objectCopy, readonlyCopy, readonlyOriginal, tupleCopy, tupleOriginal };
