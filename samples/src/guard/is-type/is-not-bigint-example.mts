// Example: src/guard/is-type.mts (isNotBigint)
import { isNotBigint } from 'ts-data-forge';

// embed-sample-code-ignore-above
const values: unknown[] = [1n, 2, 3n];

const nonBigints = values.filter(isNotBigint);

assert.deepStrictEqual(nonBigints, [2]);
