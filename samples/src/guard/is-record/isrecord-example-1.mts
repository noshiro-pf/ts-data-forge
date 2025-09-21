// Sample code extracted from src/guard/is-record.mts (isRecord)
// Basic usage with different value types:

import { isRecord } from 'ts-data-forge';

isRecord({}); // true (empty object)
isRecord({ name: 'John' }); // true (object literal)
isRecord(Object.create(null)); // true (object created with Object.create)
isRecord(new Object()); // true (object constructor)

isRecord([]); // false (array)
isRecord([1, 2, 3]); // false (array with elements)
isRecord(null); // false (null)
isRecord(undefined); // false (undefined)
isRecord('string'); // false (primitive)
isRecord(42); // false (primitive)
isRecord(() => {}); // false (function)
isRecord(new Date()); // false (Date object - not a plain record)
isRecord(/regex/); // false (RegExp object)
