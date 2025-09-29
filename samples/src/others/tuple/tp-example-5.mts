// Example: src/others/tuple.mts (tp)
// Advanced type inference

import { tp } from 'ts-data-forge';

// Const assertions comparison
const tuple1 = [1, 2, 3]; // number[]
const tuple2 = [1, 2, 3] as const; // readonly [1, 2, 3]
const tuple3 = tp(1, 2, 3); // readonly [1, 2, 3]

// Building complex types
const config = tp(
  tp('host', 'localhost'),
  tp('port', 3000),
  tp('secure', true),
);
// Type: readonly [
//   readonly ['host', 'localhost'],
//   readonly ['port', 3000],
//   readonly ['secure', true]
// ]

// Type-safe destructuring
const [[, host], [, port], [, secure]] = config;
// host: 'localhost', port: 3000, secure: true

export { config, host, port, secure, tuple1, tuple2, tuple3 };
