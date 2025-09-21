// Sample code extracted from src/number/branded-types/uint.mts (asUint)
import { asUint } from 'ts-data-forge';

const x = asUint(5); // Uint
const y = asUint(0); // Uint
// asUint(-1); // throws TypeError
// asUint(1.5); // throws TypeError
