import { range } from './range.mjs';

describe('range', () => {
  test('JSDoc example', () => {
    // Basic ascending range
    const result1: number[] = [];
    for (const n of range(0, 5)) {
      result1.push(n);
    }
    assert.deepStrictEqual(result1, [0, 1, 2, 3, 4]);

    // Range with custom step
    const result2: number[] = [];
    for (const n of range(0, 10, 2)) {
      result2.push(n);
    }
    assert.deepStrictEqual(result2, [0, 2, 4, 6, 8]);

    // Descending range with negative step
    const result3: number[] = [];
    for (const n of range(10, 0, -1)) {
      result3.push(n);
    }
    assert.deepStrictEqual(result3, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);

    // Convert generator to array
    const numbers = Array.from(range(1, 4));
    assert.deepStrictEqual(numbers, [1, 2, 3]);
    const evens = [...range(0, 11, 2)];
    assert.deepStrictEqual(evens, [0, 2, 4, 6, 8, 10]);

    // Empty ranges
    assert.deepStrictEqual(Array.from(range(5, 5)), []); // start equals end
    assert.deepStrictEqual(Array.from(range(5, 3)), []); // positive step, start > end
    assert.deepStrictEqual(Array.from(range(3, 5, -1)), []); // negative step, start < end

    // Using with iterator protocol manually
    const gen = range(1, 4);
    assert.deepStrictEqual(gen.next(), { value: 1, done: false });
    assert.deepStrictEqual(gen.next(), { value: 2, done: false });
    assert.deepStrictEqual(gen.next(), { value: 3, done: false });
    assert.deepStrictEqual(gen.next(), { value: undefined, done: true });

    // Generate test data
    const testIds = [...range(1, 6)];
    assert.deepStrictEqual(testIds, [1, 2, 3, 4, 5]);
  });
});
