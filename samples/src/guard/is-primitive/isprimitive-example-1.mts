// Example: src/guard/is-primitive.mts (isPrimitive)
// Basic usage with different value types:

import { isPrimitive } from 'ts-data-forge';

isPrimitive('hello'); // true (string)
isPrimitive(42); // true (number)
isPrimitive(true); // true (boolean)
isPrimitive(undefined); // true (undefined)
isPrimitive(Symbol('test')); // true (symbol)
isPrimitive(123n); // true (bigint)
isPrimitive(null); // true (null is primitive despite typeof quirk)

isPrimitive({}); // false (object)
isPrimitive([]); // false (array)
isPrimitive(() => {}); // false (function)
isPrimitive(new Date()); // false (object instance)
isPrimitive(/regex/); // false (RegExp object)
