// Example: src/guard/is-type.mts
import { isBoolean, isNumber, isString, isUndefined } from 'ts-data-forge';

const value: unknown = 'example';
const checks = {
  isBoolean: isBoolean(value),
  isNumber: isNumber(value),
  isString: isString(value),
  isUndefined: isUndefined(value),
};

const summary = {
  checks,
  value,
};

// embed-sample-code-ignore-below
export { summary };
