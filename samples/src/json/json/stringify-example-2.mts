// Example: src/json/json.mts (stringify)
// Error handling

import { Json, Result } from 'ts-data-forge';

const circular: any = { name: 'test' };
circular.self = circular;
const error = Json.stringify(circular);
if (Result.isErr(error)) {
  console.log('Stringify failed:', error.value);
}

export { circular, error };
