// Example: src/number/num.mts (isInRangeInclusive)
import { Num } from 'ts-data-forge';

const inRange = Num.isInRangeInclusive(1, 10);
const checks = [inRange(1), inRange(5), inRange(11)];

assert.deepStrictEqual(checks, [true, true, false]);
assert.strictEqual(typeof inRange, 'function');
