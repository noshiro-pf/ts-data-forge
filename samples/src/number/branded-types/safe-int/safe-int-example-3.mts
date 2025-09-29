// Example: src/number/branded-types/safe-int.mts (safe-int)
import { SafeInt, asSafeInt } from 'ts-data-forge';

SafeInt.max(asSafeInt(5), asSafeInt(3)); // SafeInt (5)
SafeInt.max(asSafeInt(-10), asSafeInt(0), asSafeInt(10)); // SafeInt (10)
