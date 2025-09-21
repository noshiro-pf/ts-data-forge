// Sample code extracted from src/guard/is-type.mts (isNotNull)
const items: (string | null)[] = ['a', null, 'b', null, 'c'];

const nonNullItems = items.filter(isNotNull);
// nonNullItems is now string[] - null values are filtered out

nonNullItems.forEach((item) => {
  // item is guaranteed to be string, not null
  console.log(item.toUpperCase());
});
