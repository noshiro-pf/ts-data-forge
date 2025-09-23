// Example: src/array/array-utils.mts (foldr)
import { Arr } from 'ts-data-forge';

const numbers = [1, 2, 3];

const subtractRight = Arr.foldr(numbers, (acc, value) => acc - value, 0);
const joinFromRight = Arr.foldr<number, string>(
  (acc, value) => `${acc}${value}`,
  '',
)(numbers);

assert.strictEqual(subtractRight, -6);
assert.strictEqual(joinFromRight, '321');
