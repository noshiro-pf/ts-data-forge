// Sample code extracted from src/others/unknown-to-string.mts (unknownToString)
// Object stringification

import { unknownToString } from 'ts-data-forge';

// Simple object
const obj = { a: 1, b: 'hello', c: [1, 2, 3] };
const result = unknownToString(obj);
console.log(result); // '{"a":1,"b":"hello","c":[1,2,3]}'

// Pretty printing
const prettyResult = unknownToString(obj, { prettyPrintObject: true });
console.log(prettyResult);
// {
//   "a": 1,
//   "b": "hello",
//   "c": [
//     1,
//     2,
//     3
//   ]
// }
