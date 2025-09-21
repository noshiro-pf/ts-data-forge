// Sample code extracted from src/functional/result.mts (fromThrowable)
import { Result } from 'ts-data-forge';

// Wrapping JSON.parse which can throw
const parseJson = <T,>(text: string): Result<T, Error> =>
  Result.fromThrowable(() => JSON.parse(text) as T);

const validJson = parseJson<{ valid: boolean }>('{"valid": true}');
if (Result.isOk(validJson)) {
  console.log(validJson.value.valid); // true
}
