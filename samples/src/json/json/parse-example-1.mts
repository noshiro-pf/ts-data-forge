// Sample code extracted from src/json/json.mts (parse)
import { Json, Result } from 'ts-data-forge';

const result = Json.parse('{"name": "John", "age": 30}');
if (Result.isOk(result)) {
  console.log(result.value.name); // 'John'
}

export { result };
