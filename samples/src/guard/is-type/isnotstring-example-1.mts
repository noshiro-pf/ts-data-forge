// Sample code extracted from src/guard/is-type.mts (isNotString)
type Value = string | number | boolean;
const mixedValues: Value[] = ['hello', 42, true, 'world', 3.14];

const nonStrings = mixedValues.filter(isNotString);
// nonStrings is now (number | boolean)[] - strings are filtered out
