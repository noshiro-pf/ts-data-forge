// Example: src/guard/is-type.mts (isNotNumber)
import { isNotNumber } from 'ts-data-forge';

const mixed: unknown[] = [1, '2', 3];

const nonNumbers = mixed.filter(isNotNumber);

assert.deepStrictEqual(nonNumbers, ['2']);
