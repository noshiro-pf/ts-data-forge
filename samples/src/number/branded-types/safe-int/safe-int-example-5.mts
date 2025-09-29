// Example: src/number/branded-types/safe-int.mts (safe-int)
import { SafeInt, asSafeInt } from 'ts-data-forge';

SafeInt.div(asSafeInt(10), asSafeInt(3)); // SafeInt (3)
SafeInt.div(asSafeInt(-10), asSafeInt(3)); // SafeInt (-4)

// Large number division
const large = asSafeInt(1_000_000_000_000);
const divisor = asSafeInt(1_000_000);
SafeInt.div(large, divisor); // SafeInt (1000000)

export { divisor, large };
