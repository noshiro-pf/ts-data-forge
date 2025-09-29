// Example: src/json/json.mts (parse)
import { Json, Result } from 'ts-data-forge';

const invalid = Json.parse('invalid json');
if (Result.isErr(invalid)) {
  console.log('Parse failed:', invalid.value);
}

export { invalid };
