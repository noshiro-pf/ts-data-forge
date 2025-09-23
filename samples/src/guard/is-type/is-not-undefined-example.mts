// Example: src/guard/is-type.mts (isNotUndefined)
import { isNotUndefined } from 'ts-data-forge';

const values: (number | undefined)[] = [1, undefined, 2];

const definedValues = values.filter(isNotUndefined);

assert.deepStrictEqual(definedValues, [1, 2]);
