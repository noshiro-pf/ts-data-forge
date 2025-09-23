// Example: src/number/branded-types/safe-int.mts (SafeInt.max)
import { SafeInt, asSafeInt } from 'ts-data-forge';

const largest = SafeInt.max(asSafeInt(25), asSafeInt(-14), asSafeInt(99));

assert.strictEqual(largest, 99);
