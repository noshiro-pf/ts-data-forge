// Example: src/others/cast-readonly.mts (castDeepReadonly)
// Type inference with generics

import { castDeepReadonly } from 'ts-data-forge';

function processData<T>(data: T): DeepReadonly<T> {
  // Perform processing...
  console.log('Processing:', data);

  // Return immutable version
  return castDeepReadonly(data);
}

const result = processData({ nested: { value: [1, 2, 3] } });
// Type of result is DeepReadonly<{ nested: { value: number[] } }>

export { processData, result };
