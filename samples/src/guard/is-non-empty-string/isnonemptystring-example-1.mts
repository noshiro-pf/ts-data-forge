// Sample code extracted from src/guard/is-non-empty-string.mts (isNonEmptyString)
// Basic usage with different string types:

import { isNonEmptyString } from 'ts-data-forge';

isNonEmptyString('hello'); // true
isNonEmptyString(' '); // true (whitespace is considered non-empty)
isNonEmptyString('\t\n'); // true (whitespace characters are non-empty)
isNonEmptyString(''); // false
isNonEmptyString(null); // false
isNonEmptyString(undefined); // false
