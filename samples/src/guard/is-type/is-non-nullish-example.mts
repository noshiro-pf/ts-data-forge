// Example: src/guard/is-type.mts (isNonNullish)
import { isNonNullish } from 'ts-data-forge';

const values: (string | null | undefined)[] = ['Ada', null, undefined];

const definedValues = values.filter(isNonNullish);

assert.deepStrictEqual(definedValues, ['Ada']);
