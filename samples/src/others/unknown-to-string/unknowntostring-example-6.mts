// Example: src/others/unknown-to-string.mts (unknownToString)
// Working with special objects

import { unknownToString } from 'ts-data-forge';

// Date objects
unknownToString(new Date('2023-01-01'));
// '"2023-01-01T00:00:00.000Z"' - JSON stringified

// Regular expressions
unknownToString(/test/gi);
// '{}' - RegExp has no enumerable properties

// Arrays
unknownToString([1, 'two', { three: 3 }]);
// '[1,"two",{"three":3}]'

// Map and Set (converted to empty objects by JSON.stringify)
unknownToString(new Map([['a', 1]])); // '{}'
unknownToString(new Set([1, 2, 3])); // '{}'
