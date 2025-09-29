// Example: src/guard/is-type.mts (isNonNullish)
const items: (string | null | undefined)[] = [
  'hello',
  null,
  'world',
  undefined,
  'test',
];

const definedItems = items.filter(isNonNullish);
// definedItems is now string[] - both null and undefined values are filtered out

definedItems.forEach((item) => {
  // item is guaranteed to be string, never null or undefined
  console.log(item.toUpperCase());
});

export { definedItems, items };
