// Example: src/functional/result.mts (Result.toOptional)
import { Optional, Result } from 'ts-data-forge';

const okValue = Result.ok(7);
const errValue = Result.err('fail');

assert.deepStrictEqual(Result.toOptional(okValue), Optional.some(7));
assert.deepStrictEqual(Result.toOptional(errValue), Optional.none);
