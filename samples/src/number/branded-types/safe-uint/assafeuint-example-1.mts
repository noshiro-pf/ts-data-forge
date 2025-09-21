// Sample code extracted from src/number/branded-types/safe-uint.mts (asSafeUint)
import { asSafeUint } from 'ts-data-forge';

const x = asSafeUint(5); // SafeUint
const y = asSafeUint(0); // SafeUint
// asSafeUint(-1); // throws TypeError
// asSafeUint(1.5); // throws TypeError
