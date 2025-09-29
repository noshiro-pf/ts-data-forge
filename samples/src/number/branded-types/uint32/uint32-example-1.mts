// Example: src/number/branded-types/uint32.mts (Uint32)
import { Uint32, asNonZeroUint32, asUint32 } from 'ts-data-forge';

// Type checking
Uint32.is(1_000_000); // true
Uint32.is(-1); // false
Uint32.is(5_000_000_000); // false (exceeds 2^32)

// Constants
console.log(Uint32.MIN_VALUE); // 0
console.log(Uint32.MAX_VALUE); // 4294967295 (2^32 - 1)

// Arithmetic operations (all results clamped to [0, 2^32))
const a = asUint32(1_000_000);
const b = asNonZeroUint32(500_000);

Uint32.add(a, b); // Uint32 (1500000)
Uint32.sub(a, b); // Uint32 (500000)
Uint32.mul(a, b); // Uint32 (clamped if overflow)
Uint32.div(a, b); // Uint32 (2)
Uint32.pow(asUint32(2), asUint32(10)); // Uint32 (1024)

// Utility functions
Uint32.min(a, b); // Uint32 (500000)
Uint32.max(a, b); // Uint32 (1000000)
Uint32.clamp(5_000_000_000); // Uint32 (MAX_VALUE)
Uint32.random(); // Random Uint32

export { a, b };
