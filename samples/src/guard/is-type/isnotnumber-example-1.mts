// Sample code extracted from src/guard/is-type.mts (isNotNumber)
type Value = string | number | boolean;
const values: Value[] = ['hello', 42, true, 3.14, false];

const nonNumbers = values.filter(isNotNumber);
// nonNumbers is now (string | boolean)[] - numbers are filtered out

export { nonNumbers, values };
export type { Value };
