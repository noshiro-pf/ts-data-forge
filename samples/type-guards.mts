import { hasKey, isNonNullObject, isRecord } from 'ts-data-forge';

const processData = (data: unknown): void => {
  if (isRecord(data)) {
    // data is now UnknownRecord (= Readonly<Record<string, unknown>>)
    if (
      hasKey(data, 'name') &&
      // data is now ReadonlyRecord<"name", unknown> & UnknownRecord
      typeof data.name === 'string'
    ) {
      console.log(`Hello, ${data.name}!`);
    }
  }
};

// Non-null object checking
const value: unknown = { key: 'value' };
if (isNonNullObject(value)) {
  // value is guaranteed to be a non-null object
  console.log(Object.keys(value));
}

// Example usage
processData({ name: 'Alice' }); // Hello, Alice!
processData({ age: 30 }); // No output
processData('not an object'); // No output
