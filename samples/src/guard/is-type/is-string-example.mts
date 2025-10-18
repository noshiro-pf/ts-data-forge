// Example: src/guard/is-type.mts (isString)
import { isString } from 'ts-data-forge';

// embed-sample-code-ignore-above
const values: unknown[] = ['Ada', 42, 'Lovelace'];

const strings = values.filter(isString);

assert.deepStrictEqual(strings, ['Ada', 'Lovelace']);
