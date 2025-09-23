// Example: src/guard/is-type.mts (isNotBoolean)
import { isNotBoolean } from 'ts-data-forge';

const flags: unknown[] = [true, 'no', false];

const nonBooleans = flags.filter(isNotBoolean);

assert.deepStrictEqual(nonBooleans, ['no']);
