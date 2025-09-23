// Example: src/number/num.mts (Num.isNonNegative)
import { Num } from 'ts-data-forge';

const candidate = 10;

if (Num.isNonNegative(candidate)) {
  const index: number = candidate;
  assert.strictEqual(index, 10);
}

assert.strictEqual(Num.isNonNegative(-1), false);
