// Example: src/number/branded-types/uint32.mts (uint32)
import { Uint32, asUint32 } from 'ts-data-forge';

Uint32.add(asUint32(1_000_000), asUint32(500_000)); // Uint32 (1500000)
