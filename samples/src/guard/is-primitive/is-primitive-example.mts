// Example: src/guard/is-primitive.mts (isPrimitive)
import { isPrimitive } from 'ts-data-forge';

const values: readonly unknown[] = [42, 'Ada', null, { id: 1 }] as const;

const primitives = values.filter(isPrimitive);

assert.deepStrictEqual(primitives, [42, 'Ada', null]);
