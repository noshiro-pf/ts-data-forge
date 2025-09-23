// Example: src/number/num.mts (Num.isInRange)
import { Num } from 'ts-data-forge';

const isGrade = Num.isInRange(0, 100);

assert.strictEqual(isGrade(50), true);
assert.strictEqual(isGrade(100), false);
