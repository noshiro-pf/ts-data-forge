// Example: src/guard/is-non-null-object.mts (isNonNullObject)
// Filtering arrays to find objects:

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

for (const obj of objects) {
  // Each obj is guaranteed to be an object
  console.log('Object type:', obj.constructor.name);
}

export { mixedArray, objects };
