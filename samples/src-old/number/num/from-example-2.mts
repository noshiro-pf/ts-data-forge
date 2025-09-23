// Example: src/number/num.mts (from)
import { Num } from 'ts-data-forge';

const parsed = Num.from('123.45');
const invalid = Num.from('hello');

assert.ok(Number.isNaN(invalid));
assert.strictEqual(parsed, 123.45);
