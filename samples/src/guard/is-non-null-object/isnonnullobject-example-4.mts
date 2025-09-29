// Example: src/guard/is-non-null-object.mts (isNonNullObject)
// Progressive type narrowing with other guards:

import { hasKey, isNonNullObject, isRecord } from 'ts-data-forge';

const apiResponse: unknown = await fetchData();

if (isNonNullObject(apiResponse)) {
  // apiResponse is now object

  if (isRecord(apiResponse)) {
    // Further narrowed to UnknownRecord (plain object, not array)

    if (hasKey(apiResponse, 'status')) {
      console.log('API status:', apiResponse.status);
    }
  } else if (Array.isArray(apiResponse)) {
    console.log('Response is an array with length:', apiResponse.length);
  }
}

export { apiResponse };
