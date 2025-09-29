// Example: src/number/branded-types/uint32.mts (uint32)
import { Uint32, asUint32 } from 'ts-data-forge';

Uint32.pow(asUint32(2), asUint32(10)); // Uint32 (1024)
