// Sample code extracted from src/functional/result.mts (unwrapErr)
import { Result } from 'ts-data-forge';

const failure = Result.err('Connection failed');
console.log(Result.unwrapErr(failure)); // "Connection failed"

const success = Result.ok(42);
console.log(Result.unwrapErr(success)); // undefined

export { failure, success };
