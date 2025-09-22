// Sample code extracted from src/others/unknown-to-string.mts (unknownToString)
// Basic type conversions

import { unknownToString } from 'ts-data-forge';

// Primitive types
unknownToString('hello'); // 'hello'
unknownToString(123); // '123'
unknownToString(true); // 'true'
unknownToString(null); // 'null'
unknownToString(undefined); // 'undefined'
unknownToString(Symbol('test')); // 'Symbol(test)'
unknownToString(123n); // '123'

// Function conversion
const fn = () => 'test';
unknownToString(fn); // "() => 'test'"

export { fn };
