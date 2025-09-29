// Example: src/number/branded-types/uint32.mts (uint32)
import { Uint32, asNonZeroUint32, asUint32 } from 'ts-data-forge';

Uint32.div(asUint32(1_000_000), asNonZeroUint32(500_000)); // Uint32 (2)
Uint32.div(asUint32(7), asUint32(3)); // Uint32 (2) - floor division
