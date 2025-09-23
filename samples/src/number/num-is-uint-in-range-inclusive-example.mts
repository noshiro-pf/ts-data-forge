// Example: src/number/num.mts (Num.isUintInRangeInclusive)
import { Num } from 'ts-data-forge';

const inclusiveGuard = Num.isUintInRangeInclusive(0, 5);

assert.strictEqual(inclusiveGuard(5), true);
assert.strictEqual(inclusiveGuard(6), false);
