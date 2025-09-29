// Example: src/others/unknown-to-string.mts (unknownToString)
// Error handling for circular references

import { unknownToString } from 'ts-data-forge';

// Circular reference
const circular: any = { name: 'parent' };
circular.self = circular;

const result = unknownToString(circular);
console.log(result); // "Converting circular structure to JSON"

export { circular, result };
