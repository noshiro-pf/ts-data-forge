// Example: src/number/num.mts (isInRange)
import { Num } from 'ts-data-forge';

const isInRange0to10 = Num.isInRange(0, 10);
const results = [isInRange0to10(5), isInRange0to10(10), isInRange0to10(-1)];

assert.strictEqual(typeof isInRange0to10, 'function');
assert.deepStrictEqual(results, [true, false, false]);
