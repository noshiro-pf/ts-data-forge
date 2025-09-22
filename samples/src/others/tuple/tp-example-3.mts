// Sample code extracted from src/others/tuple.mts (tp)
// Building type-safe data structures

import { tp } from 'ts-data-forge';

// Creating a type-safe map structure
const colorMap = [
  tp('red', '#FF0000'),
  tp('green', '#00FF00'),
  tp('blue', '#0000FF'),
] as const;
// Type: readonly [readonly ['red', '#FF0000'], ...]

// Type-safe event system
type EventTuple = readonly ['click', MouseEvent] | readonly ['change', Event];
const event = tp('click', new MouseEvent('click')) as EventTuple;

export { colorMap, event };
export type { EventTuple };
