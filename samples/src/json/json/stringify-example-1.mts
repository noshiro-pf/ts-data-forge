// Sample code extracted from src/json/json.mts (stringify)
import { Json, Result } from 'ts-data-forge';

const obj = { name: 'John', age: 30 };
const result = Json.stringify(obj);
if (Result.isOk(result)) {
  console.log(result.value); // '{"name":"John","age":30}'
}

export { obj, result };
