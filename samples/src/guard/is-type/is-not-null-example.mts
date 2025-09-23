// Example: src/guard/is-type.mts (isNotNull)
import { isNotNull } from 'ts-data-forge';

const values: (number | null)[] = [null, 5];

const nonNullValues = values.filter(isNotNull);

assert.deepStrictEqual(nonNullValues, [5]);
