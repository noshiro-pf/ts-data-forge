// Sample code extracted from src/guard/is-primitive.mts (isPrimitive)
// Deep cloning detection - primitives don't need cloning:

import { isPrimitive, isRecord } from 'ts-data-forge';

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
