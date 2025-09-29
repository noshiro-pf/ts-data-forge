// Example: src/number/branded-types/safe-int.mts (safe-int)
import { SafeInt, asSafeInt } from 'ts-data-forge';

SafeInt.min(asSafeInt(5), asSafeInt(3)); // SafeInt (3)
SafeInt.min(asSafeInt(-10), asSafeInt(0), asSafeInt(10)); // SafeInt (-10)
