// Sample code extracted from src/guard/is-primitive.mts (isPrimitive)
// Serialization helpers:

import { isPrimitive } from 'ts-data-forge';

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
