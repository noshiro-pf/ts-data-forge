// Example: src/number/branded-types/safe-int.mts (safe-int)
import { SafeInt, asSafeInt } from 'ts-data-forge';

SafeInt.abs(asSafeInt(-42)); // SafeInt (42)
SafeInt.abs(asSafeInt(42)); // SafeInt (42)
SafeInt.abs(SafeInt.MIN_VALUE); // SafeInt (MAX_SAFE_INTEGER)
