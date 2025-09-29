// Example: src/guard/is-type.mts (isNotUndefined)
const items: (string | undefined)[] = ['a', undefined, 'b', undefined, 'c'];

const definedItems = items.filter(isNotUndefined);
// definedItems is now string[] - undefined values are filtered out

definedItems.forEach((item) => {
  // item is guaranteed to be string, not undefined
  console.log(item.toUpperCase());
});

export { definedItems, items };
