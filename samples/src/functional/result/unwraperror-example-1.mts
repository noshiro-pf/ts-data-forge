// Sample code extracted from src/functional/result.mts (unwrapErrOr)
import { Result } from 'ts-data-forge';

const result = Result.err('failed');
const error = Result.unwrapErrOr(result, 'default');
console.log(error); // "failed"
