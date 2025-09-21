// Sample code extracted from src/others/map-nullable.mts (mapNullable)
// Basic usage with nullable values

import { mapNullable } from 'ts-data-forge';

// Safe string transformation
mapNullable('hello', (s) => s.toUpperCase()); // "HELLO"
mapNullable(null, (s) => s.toUpperCase()); // undefined
mapNullable(undefined, (s) => s.toUpperCase()); // undefined

// Number operations
mapNullable(5, (n) => n * 2); // 10
mapNullable(0, (n) => n * 2); // 0 (note: 0 is not null/undefined)
mapNullable(null as number | null, (n) => n * 2); // undefined
