// Example: src/number/num.mts (isUintInRange)
import { Num } from 'ts-data-forge';

const isValidSmallIndex = Num.isUintInRange(0, 11);
const checks = [isValidSmallIndex(5), isValidSmallIndex(12)];

assert.deepStrictEqual(checks, [true, false]);
assert.strictEqual(typeof isValidSmallIndex, 'function');
