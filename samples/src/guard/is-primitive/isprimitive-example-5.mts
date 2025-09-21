// Sample code extracted from src/guard/is-primitive.mts (isPrimitive)
// Type narrowing in conditional logic:

import { isPrimitive } from 'ts-data-forge';

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
        return `Symbol: ${value.description || 'unnamed'}`;
      case 'bigint':
        return `BigInt: ${value}n`;
      case 'object': // This is null
        return 'Null';
      default:
        return 'Unknown primitive';
    }
  } else {
    return `Object: ${value?.constructor?.name || 'Unknown'}`;
  }
}
