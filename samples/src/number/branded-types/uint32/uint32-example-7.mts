// Sample code extracted from src/number/branded-types/uint32.mts (uint32)
import { Uint32, asUint32 } from 'ts-data-forge';

Uint32.div(asUint32(1000000), asUint32(500000)); // Uint32 (2)
Uint32.div(asUint32(7), asUint32(3)); // Uint32 (2) - floor division
