// Sample code extracted from src/number/branded-types/uint32.mts (uint32)
import { Uint32, asUint32 } from 'ts-data-forge';

Uint32.sub(asUint32(1000000), asUint32(500000)); // Uint32 (500000)
Uint32.sub(asUint32(100), asUint32(500)); // Uint32 (0) - clamped
