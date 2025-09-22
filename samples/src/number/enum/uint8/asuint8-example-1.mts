// Sample code extracted from src/number/enum/uint8.mts (asUint8)
import { asUint8 } from 'ts-data-forge';

const x = asUint8(255); // Uint8
const y = asUint8(0); // Uint8
// asUint8(-1); // throws TypeError
// asUint8(256); // throws TypeError
// asUint8(1.5); // throws TypeError

export { x, y };
