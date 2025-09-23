// Example: src/number/num.mts (Num.from)
import { Num } from 'ts-data-forge';

const input = '123.45';

const result = Num.from(input);

assert.strictEqual(result, 123.45);
