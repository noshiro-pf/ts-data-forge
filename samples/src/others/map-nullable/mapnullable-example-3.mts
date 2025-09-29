// Example: src/others/map-nullable.mts (mapNullable)
// Curried usage for functional composition

import { mapNullable } from 'ts-data-forge';

// Create reusable transformers
const toUpperCase = mapNullable((s: string) => s.toUpperCase());
const addPrefix = mapNullable((s: string) => `PREFIX_${s}`);
const parseNumber = mapNullable((s: string) => Number.parseInt(s, 10));

// Use in different contexts
toUpperCase('hello'); // "HELLO"
toUpperCase(null); // undefined

// Compose transformations
const processString = (s: string | null) => {
  const upper = toUpperCase(s);
  return addPrefix(upper);
};

processString('test'); // "PREFIX_TEST"
processString(null); // undefined

export { addPrefix, parseNumber, processString, toUpperCase };
