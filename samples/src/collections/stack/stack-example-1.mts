// Sample code extracted from src/collections/stack.mts (Stack)
import type { Stack } from 'ts-data-forge';

import { createStack } from './stack';

// Example 1: Basic LIFO operations
const operationStack: Stack<string> = createStack<string>();

operationStack.push('operation1'); // Add to top
operationStack.push('operation2'); // Add to top
operationStack.push('operation3'); // Add to top

console.log(operationStack.size); // Output: 3

// Process operations in LIFO order
console.log(operationStack.pop().unwrap()); // "operation3" (last in, first out)
console.log(operationStack.pop().unwrap()); // "operation2"
console.log(operationStack.size); // Output: 1

// Example 2: Undo functionality
type Action = { type: string; data: any; timestamp: number };
const undoStack: Stack<Action> = createStack<Action>();

undoStack.push({ type: 'delete', data: { id: 123 }, timestamp: Date.now() });
undoStack.push({
  type: 'edit',
  data: { field: 'name', oldValue: 'old' },
  timestamp: Date.now(),
});

// Undo last action
if (!undoStack.isEmpty) {
  const lastAction = undoStack.pop().unwrap();
  console.log(`Undoing: ${lastAction.type}`);
}
