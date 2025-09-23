// Example: src/functional/result.mts (Result.expectToBe)
import { Result } from 'ts-data-forge';

const okValue = Result.ok('data');

assert.strictEqual(Result.expectToBe(okValue, 'should have value'), 'data');

const expectResult = Result.expectToBe<string>('missing result');

assert.throws(() => expectResult(Result.err('boom')), /missing result/);
assert.strictEqual(expectResult(Result.ok('value')), 'value');
