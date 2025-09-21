// Sample code extracted from src/others/tuple.mts (tp)
// Basic tuple creation with literal types

import { tp } from 'ts-data-forge';

// Without tp: types are widened
const arr = [1, 'hello', true]; // (string | number | boolean)[]

// With tp: exact literal types preserved
const tuple = tp(1, 'hello', true); // readonly [1, 'hello', true]
const coords = tp(10, 20); // readonly [10, 20]
const single = tp('only'); // readonly ['only']
const empty = tp(); // readonly []

// TypeScript knows exact values at compile time
type First = (typeof tuple)[0]; // 1 (literal type)
type Second = (typeof tuple)[1]; // 'hello' (literal type)
