// Sample code extracted from src/functional/result.mts (orElse)
import { Result } from 'ts-data-forge';

const primary = Result.err('error');
const fallback = Result.ok('default');
const result = Result.orElse(primary, fallback);
console.log(Result.unwrapOk(result)); // "default"
