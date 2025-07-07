import { Result } from '../index.mjs';
import { unknownToString } from './unknown-to-string.mjs';

describe('unknownToString', () => {
  test('JSDoc example', () => {
    // Basic conversions
    assert(Result.unwrapOk(unknownToString('hello')) === 'hello');
    assert(Result.unwrapOk(unknownToString(123)) === '123');
    assert(Result.unwrapOk(unknownToString(null)) === 'null');
    assert(Result.unwrapOk(unknownToString({ a: 1 })) === '{"a":1}');

    // Circular reference handling
    const circular: any = {};
    circular.self = circular;
    assert(Result.isErr(unknownToString(circular)));
  });
});
