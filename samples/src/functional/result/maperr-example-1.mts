// Sample code extracted from src/functional/result.mts (mapErr)
import { Result } from 'ts-data-forge';

const result = Result.err('error');
const mapped = Result.mapErr(result, (e) => e.toUpperCase());
console.log(Result.unwrapErr(mapped)); // "ERROR"

export { mapped, result };
