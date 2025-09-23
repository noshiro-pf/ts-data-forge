// Example: src/object/object.mts
import { Obj } from 'ts-data-forge';

const user = { id: 1, name: 'Ada', role: 'admin' };
const picked = Obj.pick(user, ['id', 'name'] as const);
const omitted = Obj.omit(user, ['role'] as const);
const equal = Obj.shallowEq(picked, { id: 1, name: 'Ada' });

assert.strictEqual(equal, true);
assert.deepStrictEqual(omitted, {
  id: 1,
  name: 'Ada',
});
assert.deepStrictEqual(picked, {
  id: 1,
  name: 'Ada',
});
assert.deepStrictEqual(user, {
  id: 1,
  name: 'Ada',
  role: 'admin',
});
