import { isNonNullObject } from './is-non-null-object.mjs';

describe('isNonNullObject', () => {
  test('Basic usage with different value types:', () => {
    assert(isNonNullObject({}) === true); // true (plain object)
    assert(isNonNullObject([]) === true); // true (arrays are objects)
    assert(isNonNullObject(new Date()) === true); // true (Date instance)
    assert(isNonNullObject(/regex/) === true); // true (RegExp instance)
    assert(isNonNullObject(new Map()) === true); // true (Map instance)
    assert(isNonNullObject(null) === false); // false (null is not considered object here)
    assert(isNonNullObject(undefined) === false); // false (primitive)
    assert(isNonNullObject('string') === false); // false (primitive)
    assert(isNonNullObject(42) === false); // false (primitive)
    assert(isNonNullObject(true) === false); // false (primitive)
    assert(isNonNullObject(() => {}) === false); // false (functions are not objects in this context)
  });

  test('Type guard usage with unknown values:', () => {
    const value: unknown = { name: 'John', age: 30 };

    if (isNonNullObject(value)) {
      // value is now typed as object
      assert(typeof value === 'object');

      // You can now safely use object-specific operations
      const keys = Object.keys(value);
      assert(keys.length >= 0);
      const str = value.toString();
      assert(typeof str === 'string');

      // But you may need additional checks for specific object types
      if (Array.isArray(value)) {
        assert(false); // This won't execute for this example
      }
    } else {
      assert(false); // should not reach here
    }
  });

  test('Filtering arrays to find objects:', () => {
    const mixedArray: unknown[] = [
      { name: 'John' },
      'string',
      [1, 2, 3],
      42,
      null,
      new Date(),
      () => 'function',
    ];

    const objects = mixedArray.filter(isNonNullObject);
    // objects contains: [{ name: 'John' }, [1, 2, 3], Date instance]
    // Note: includes both plain objects and arrays

    objects.forEach((obj) => {
      // Each obj is guaranteed to be an object
      console.log('Object type:', obj.constructor.name);
    });
  });

  test('Progressive type narrowing with other guards:', () => {
    const apiResponse: unknown = { status: 'success', data: [1, 2, 3] };

    if (isNonNullObject(apiResponse)) {
      // apiResponse is now object
      assert(typeof apiResponse === 'object');

      // Simplified check without external function dependencies
      if (!Array.isArray(apiResponse)) {
        // Plain object, not array
        const keys = Object.keys(apiResponse);
        assert(keys.length > 0);
      } else {
        assert(false); // This won't execute for this example
      }
    }
  });
});
