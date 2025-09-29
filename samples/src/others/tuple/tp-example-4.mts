// Example: src/others/tuple.mts (tp)
// Function argument patterns

import { tp } from 'ts-data-forge';

// Functions expecting exact tuple types
function processCoordinate(coord: readonly [number, number]): void {
  const [x, y] = coord;
  console.log(`Processing point at (${x}, ${y})`);
}

processCoordinate(tp(10, 20)); // ✅ Type-safe
processCoordinate([10, 20]); // ❌ Error: number[] not assignable

// Pattern matching with tuples
function handleMessage(
  msg: readonly ['error', string] | readonly ['success', any],
) {
  if (msg[0] === 'error') {
    console.error(msg[1]); // TypeScript knows msg[1] is string
  } else {
    console.log('Success:', msg[1]);
  }
}

handleMessage(tp('error', 'Failed to load'));
handleMessage(tp('success', { id: 123 }));

export { handleMessage, processCoordinate };
