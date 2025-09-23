// Example: src/array/array-utils.mts (groupBy)
import { Arr, Optional } from 'ts-data-forge';

const products = [
  { type: 'fruit', name: 'apple' },
  { type: 'fruit', name: 'banana' },
  { type: 'vegetable', name: 'carrot' },
] as const;

const byType = Arr.groupBy(products, (item) => item.type);
const fruits = Optional.unwrapOr(byType.get('fruit'), []);
const vegetables = Optional.unwrapOr(byType.get('vegetable'), []);

const summary = {
  byType,
  fruits,
  vegetables,
};

// embed-sample-code-ignore-below
export { byType, products, summary };
