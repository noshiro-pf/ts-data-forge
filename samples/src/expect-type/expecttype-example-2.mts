// Sample code extracted from src/expect-type.mts (expectType)
import { Arr } from 'ts-data-forge';

// Testing array utility function return types
const zeros = Arr.zeros(3);
expectType<typeof zeros, readonly [0, 0, 0]>('=');

const sequence = Arr.seq(5);
expectType<typeof sequence, readonly [0, 1, 2, 3, 4]>('=');

// Dynamic length arrays
const dynamicArray = Arr.zeros(someLength);
expectType<typeof dynamicArray, readonly 0[]>('=');
