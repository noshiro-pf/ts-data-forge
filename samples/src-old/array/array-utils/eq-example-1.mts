// Example: src/array/array-utils.mts (eq)
import { Arr } from 'ts-data-forge';

assert.ok(Arr.eq([1, 2, 3], [1, 2, 3]));
assert.notOk(Arr.eq([1, 2, 3], [1, 2, 4]));
assert.notOk(Arr.eq([1, 2], [1, 2, 3]));
assert.notOk(Arr.eq([{ a: 1 }], [{ a: 1 }]));
assert.ok(Arr.eq([{ a: 1 }], [{ a: 1 }], (o1, o2) => o1.a === o2.a));
