// Sample code extracted from src/others/map-nullable.mts (mapNullable)
// Integration with array methods

import { mapNullable } from 'ts-data-forge';

const nullableNumbers: (number | null | undefined)[] = [
  1,
  null,
  3,
  undefined,
  5,
];

// Transform and filter in one step
const doubled = nullableNumbers
  .map((n) => mapNullable(n, (x) => x * 2))
  .filter((n): n is number => n !== undefined);
// Result: [2, 6, 10]

// Process optional array elements
const users: Array<{ name?: string }> = [
  { name: 'Alice' },
  { name: undefined },
  { name: 'Bob' },
];

const upperNames = users
  .map((u) => mapNullable(u.name, (n) => n.toUpperCase()))
  .filter((n): n is string => n !== undefined);
// Result: ['ALICE', 'BOB']
