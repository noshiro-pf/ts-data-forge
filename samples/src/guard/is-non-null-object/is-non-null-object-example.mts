// Example: src/guard/is-non-null-object.mts (isNonNullObject)
import { isNonNullObject } from 'ts-data-forge';

const mixed: unknown[] = [{ id: 1 }, null, 'Ada'] as const;

const objects = mixed.filter(isNonNullObject);

assert.deepStrictEqual(objects, [{ id: 1 }]);
