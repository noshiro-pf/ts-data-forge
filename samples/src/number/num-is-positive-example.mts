// Example: src/number/num.mts (Num.isPositive)
import { Num } from 'ts-data-forge';

const amount = 42;

if (Num.isPositive(amount)) {
  assert.strictEqual(amount > 0, true);
}

assert.strictEqual(Num.isPositive(0), false);
