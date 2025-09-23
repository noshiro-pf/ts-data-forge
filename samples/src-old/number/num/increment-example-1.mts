// Example: src/number/num.mts (increment)
import { Num } from 'ts-data-forge';

const start = 0;
const incremented = Num.increment(start);

assert.strictEqual(incremented, 1);
assert.strictEqual(start, 0);
