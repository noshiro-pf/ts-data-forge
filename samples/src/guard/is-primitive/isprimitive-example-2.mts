// Example: src/guard/is-primitive.mts (isPrimitive)
// Type guard usage for separating primitives from objects:

import { isPrimitive } from 'ts-data-forge';

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

for (const primitive of primitives) {
  // primitive is now typed as Primitive
  console.log('Primitive value:', primitive);
  console.log('Type:', typeof primitive);
}

export { objects, primitives, values };
