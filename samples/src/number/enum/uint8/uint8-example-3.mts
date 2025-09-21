// Sample code extracted from src/number/enum/uint8.mts (uint8)
import { asUint8 } from 'ts-data-forge';

min_(asUint8(50), asUint8(30), asUint8(100)); // Uint8 (30)
min_(asUint8(0), asUint8(255)); // Uint8 (0)
