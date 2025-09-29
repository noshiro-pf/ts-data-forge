// Example: src/collections/stack.mts (stack)
import { range } from 'ts-data-forge';

const actionStack = createStack<string>();

// Add actions in chronological order
actionStack.push('open file'); // O(1)
actionStack.push('edit content'); // O(1)
actionStack.push('save file'); // O(1)

console.log(actionStack.size); // 3

// Actions will be undone in reverse order (LIFO)
while (!actionStack.isEmpty) {
  const action = actionStack.pop().unwrap();
  console.log(`Undoing: ${action}`);
}
// Output:
// Undoing: save file
// Undoing: edit content
// Undoing: open file

// High-volume pushing (demonstrates amortized O(1) performance)
const dataStack = createStack<number>();

for (const i of range(1000000)) {
  dataStack.push(i); // Each operation is O(1) amortized
}

console.log(dataStack.size); // 1000000

// Function call stack simulation
type StackFrame = { function: string; variables: Record<string, any> };
const callStack = createStack<StackFrame>();

callStack.push({ function: 'main', variables: { argc: 1, argv: ['program'] } });
callStack.push({ function: 'process', variables: { data: [1, 2, 3] } });
callStack.push({ function: 'validate', variables: { input: 'test' } });

// Current function context is at the top
const currentFrame = callStack.pop().unwrap();
console.log(`Current function: ${currentFrame.function}`);

export { actionStack, callStack, currentFrame, dataStack };
export type { StackFrame };
