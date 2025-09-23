// Example: src/number/num.mts (decrement)
import { Num } from 'ts-data-forge';

const start = 3;
const decremented = Num.decrement(start);

assert.strictEqual(decremented, 2);
assert.strictEqual(start, 3);
