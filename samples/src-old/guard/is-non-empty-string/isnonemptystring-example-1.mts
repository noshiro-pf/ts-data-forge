// Example: src/guard/is-non-empty-string.mts
import { isNonEmptyString } from 'ts-data-forge';

const maybeString: string | null = 'hello';
const result = isNonEmptyString(maybeString) ? maybeString : undefined;

assert.strictEqual(result, 'hello');
