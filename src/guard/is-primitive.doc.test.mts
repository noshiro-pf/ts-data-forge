import { isPrimitive } from './is-primitive.mjs';

describe('isPrimitive', () => {
  test('Basic usage with different value types:', () => {
    isPrimitive('hello'); // true (string)
    isPrimitive(42); // true (number)
    isPrimitive(true); // true (boolean)
    isPrimitive(undefined); // true (undefined)
    isPrimitive(Symbol('test')); // true (symbol)
    isPrimitive(123n); // true (bigint)
    isPrimitive(null); // true (null is primitive despite typeof quirk)

    isPrimitive({}); // false (object)
    isPrimitive([]); // false (array)
    isPrimitive(() => {}); // false (function)
    isPrimitive(new Date()); // false (object instance)
    isPrimitive(/regex/); // false (RegExp object)
  });

  test('Type guard usage for separating primitives from objects:', () => {
    const values: unknown[] = [
      'string',
      42,
      true,
      null,
      undefined,
      {},
      [],
      new Date(),
    ];

    const primitives = values.filter(isPrimitive);
    const objects = values.filter((value) => !isPrimitive(value));

    primitives.forEach((primitive) => {
      // primitive is now typed as Primitive
      console.log('Primitive value:', primitive);
      console.log('Type:', typeof primitive);
    });
  });

  test("Deep cloning detection - primitives don't need cloning:", () => {
    function deepClone<T>(value: T): T {
      if (isPrimitive(value)) {
        // Primitives are immutable, return as-is
        return value;
      }

      // Handle object cloning for non-primitives
      if (Array.isArray(value)) {
        return value.map(deepClone) as T;
      }

      if (isRecord(value)) {
        const cloned = {} as T;
        for (const key in value) {
          if (Object.hasOwn(value, key)) {
            cloned[key] = deepClone(value[key]);
          }
        }
        return cloned;
      }

      // For other object types, return as-is or implement specific cloning
      return value;
    }
  });

  test('Serialization helpers:', () => {
    function canSerializeDirectly(value: unknown): boolean {
      if (isPrimitive(value)) {
        // Most primitives can be serialized directly
        return typeof value !== 'symbol' && typeof value !== 'bigint';
      }
      return false;
    }

    function safeStringify(value: unknown): string {
      if (isPrimitive(value)) {
        if (value === null) return 'null';
        if (value === undefined) return 'undefined';
        if (typeof value === 'symbol') return value.toString();
        if (typeof value === 'bigint') return value.toString() + 'n';
        return String(value);
      }

      return JSON.stringify(value);
    }
  });

  test('Type narrowing in conditional logic:', () => {
    function processValue(value: unknown): string {
      if (isPrimitive(value)) {
        // value is now Primitive type
        switch (typeof value) {
          case 'string':
            return `String: ${value}`;
          case 'number':
            return `Number: ${value}`;
          case 'boolean':
            return `Boolean: ${value}`;
          case 'undefined':
            return 'Undefined';
          case 'symbol':
            return `Symbol: ${value.description ?? 'unnamed'}`;
          case 'bigint':
            return `BigInt: ${value}n`;
          case 'object': // This is null
            return 'Null';
          case 'function':
            return 'Function (should not reach here)';
        }
      } else {
        return `Object: ${(value as UnknownRecord).constructor?.name ?? 'Unknown'}`;
      }
    }

    assert(processValue('hello') === 'String: hello');
    assert(processValue(42) === 'Number: 42');
    assert(processValue({}) === 'Object: Object');
  });
});
