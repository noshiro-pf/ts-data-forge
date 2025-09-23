// Example: src/number/num.mts (Num.isInRangeInclusive)
import { Num } from 'ts-data-forge';

const isPercentage = Num.isInRangeInclusive(0, 100);

assert.strictEqual(isPercentage(100), true);
assert.strictEqual(isPercentage(-1), false);
