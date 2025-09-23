// Example: src/number/num.mts (Num.isUintInRange)
import { Num } from 'ts-data-forge';

const indexGuard = Num.isUintInRange(0, 5);

assert.strictEqual(indexGuard(3), true);
assert.strictEqual(indexGuard(5), false);
assert.strictEqual(indexGuard(-1), false);
