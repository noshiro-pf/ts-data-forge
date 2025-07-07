import { tp } from './tuple.mjs';

describe('tp', () => {
  test('JSDoc example', () => {
    // Instead of [1, 'hello', true] as const
    const tuple = tp(1, 'hello', true); // readonly [1, 'hello', true]
    const coords = tp(10, 20); // readonly [10, 20]
    const empty = tp(); // readonly []

    assert(tuple[0] === 1);
    assert(tuple[1] === 'hello');
    assert(coords.length === 2);
    assert(empty.length === 0);
  });
});
