// Sample code extracted from src/others/cast-readonly.mts (castReadonly)
// Working with array methods

import { castReadonly } from 'ts-data-forge';

const numbers: number[] = [1, 2, 3, 4, 5];
const readonlyNumbers = castReadonly(numbers);

// Read operations still work
const doubled = readonlyNumbers.map((n) => n * 2); // ✅ Returns new array
const sum = readonlyNumbers.reduce((a, b) => a + b, 0); // ✅ Works
const first = readonlyNumbers[0]; // ✅ Reading is allowed

// Mutations are prevented
// readonlyNumbers[0] = 10; // ❌ TypeScript Error
// readonlyNumbers.sort(); // ❌ TypeScript Error (sort mutates)

export { doubled, first, numbers, readonlyNumbers, sum };
