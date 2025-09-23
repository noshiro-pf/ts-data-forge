// Example: src/others/tuple.mts
import { tp } from 'ts-data-forge';

const point = tp(10, 20);
const labels = tp('alpha', 'beta', 'gamma');

assert.deepStrictEqual(labels, ['alpha', 'beta', 'gamma']);
assert.deepStrictEqual(point, [10, 20]);
