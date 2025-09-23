// Example: src/guard/is-type.mts
import { isBoolean, isNumber, isString, isUndefined } from 'ts-data-forge';

const value: unknown = 'example';
const checks = {
  isBoolean: isBoolean(value),
  isNumber: isNumber(value),
  isString: isString(value),
  isUndefined: isUndefined(value),
};

assert.deepStrictEqual(checks, {
  isBoolean: false,
  isNumber: false,
  isString: true,
  isUndefined: false,
});
assert.strictEqual(value, 'example');
