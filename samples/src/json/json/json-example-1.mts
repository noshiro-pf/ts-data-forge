// Sample code extracted from src/json/json.mts (Json)
// Basic usage

import { Json, Result } from 'ts-data-forge';

// Parse JSON safely
const parseResult = Json.parse('{"name": "Alice", "age": 30}');
if (Result.isOk(parseResult)) {
  console.log(parseResult.value); // { name: 'Alice', age: 30 }
}

// Stringify with error handling
const stringifyResult = Json.stringify({ name: 'Bob', age: 25 });
if (Result.isOk(stringifyResult)) {
  console.log(stringifyResult.value); // '{"name":"Bob","age":25}'
}

export { parseResult, stringifyResult };
