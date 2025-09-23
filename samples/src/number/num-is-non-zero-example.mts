// Example: src/number/num.mts (Num.isNonZero)
import { Num } from 'ts-data-forge';

const value: number = 5;

if (Num.isNonZero(value)) {
  const inverted = 1 / value;
  assert.strictEqual(inverted, 0.2);
}

assert.strictEqual(Num.isNonZero(0), false);
