// Sample code extracted from src/number/branded-types/safe-int.mts (safe-int)
import { SafeInt, asSafeInt } from 'ts-data-forge';

SafeInt.div(asSafeInt(10), asSafeInt(3)); // SafeInt (3)
SafeInt.div(asSafeInt(-10), asSafeInt(3)); // SafeInt (-4)

// Large number division
const large = asSafeInt(1000000000000);
const divisor = asSafeInt(1000000);
SafeInt.div(large, divisor); // SafeInt (1000000)
