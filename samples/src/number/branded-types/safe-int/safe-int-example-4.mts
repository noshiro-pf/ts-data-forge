// Sample code extracted from src/number/branded-types/safe-int.mts (safe-int)
import { SafeInt, asSafeInt } from 'ts-data-forge';

// Dice roll
const d20 = SafeInt.random(asSafeInt(1), asSafeInt(20));

// Random index for large array
const index = SafeInt.random(asSafeInt(0), asSafeInt(1000000));

// Can use full safe range
const any = SafeInt.random(SafeInt.MIN_VALUE, SafeInt.MAX_VALUE);

export { any, d20, index };
