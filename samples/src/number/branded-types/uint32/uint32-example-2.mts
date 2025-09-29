// Example: src/number/branded-types/uint32.mts (uint32)
import { Uint32, asUint32 } from 'ts-data-forge';

Uint32.clamp(asUint32(5000000000), Uint32.MIN_VALUE, asUint32(1000)); // Uint32 (1000)
