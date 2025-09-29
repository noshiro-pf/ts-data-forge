// Example: src/collections/stack.mts (createStack)
import { range } from 'ts-data-forge';

import { createStack } from './stack';

// Example 1: Function call simulation
type FunctionCall = { name: string; args: any[]; context: any };
const callStack = createStack<FunctionCall>();

// Simulate function calls (push onto stack)
callStack.push({ name: 'main', args: [], context: {} }, { name: 'processData', args: [data], context: {} }, { name: 'validateInput', args: [input], context: {} }); // O(1)

// Simulate function returns (pop from stack)
while (!callStack.isEmpty) {
  const call = callStack.pop().unwrap(); // O(1)
  console.log(`Returning from: ${call.name}`);
}
// Output:
// Returning from: validateInput
// Returning from: processData
// Returning from: main

// Example 2: Expression evaluation with operator precedence
const operatorStack = createStack<string>();
const operandStack = createStack<number>();

// Simulate parsing "3 + 4 * 2"
operandStack.push(3);
operatorStack.push('+');
operandStack.push(4);
operatorStack.push('*'); // Higher precedence
operandStack.push(2);

// Process higher precedence first (LIFO)
const op = operatorStack.pop().unwrap(); // "*"
const b = operandStack.pop().unwrap(); // 2
const a = operandStack.pop().unwrap(); // 4
operandStack.push(a * b); // Push result: 8

// Example 3: Undo/Redo functionality
type EditAction = {
  type: 'insert' | 'delete' | 'modify';
  position: number;
  oldValue: string;
  newValue: string;
};

const undoStack = createStack<EditAction>();
const redoStack = createStack<EditAction>();

// Perform edits (push to undo stack)
const edit1: EditAction = {
  type: 'insert',
  position: 0,
  oldValue: '',
  newValue: 'Hello',
};
const edit2: EditAction = {
  type: 'insert',
  position: 5,
  oldValue: '',
  newValue: ' World',
};

undoStack.push(edit1, edit2);

// Undo last edit
if (!undoStack.isEmpty) {
  const lastEdit = undoStack.pop().unwrap();
  redoStack.push(lastEdit);
  console.log(`Undid: ${lastEdit.type} at position ${lastEdit.position}`);
}

// Example 4: High-throughput data processing
const processingStack = createStack<number>();

// Add large amount of data (demonstrates amortized O(1) performance)
for (const i of range(100_000)) {
  processingStack.push(i); // Each push is O(1) amortized
}

// Process data in LIFO order
let processedCount = 0;
while (!processingStack.isEmpty) {
  const value = processingStack.pop().unwrap(); // O(1)
  // Process value...
  processedCount++;
}
console.log(`Processed ${processedCount} items`); // 100000

// Example 5: Stack with pre-populated data
const historyStack = createStack<string>([
  'page1.html',
  'page2.html',
  'page3.html',
  'page4.html',
]);

console.log(historyStack.size); // Output: 4

// Navigate back through history (LIFO order)
while (!historyStack.isEmpty) {
  const page = historyStack.pop().unwrap();
  console.log(`Going back to: ${page}`);
}
// Output:
// Going back to: page4.html (last added, first removed)
// Going back to: page3.html
// Going back to: page2.html
// Going back to: page1.html

export {
  a,
  b,
  callStack,
  edit1,
  edit2,
  historyStack,
  op,
  operandStack,
  operatorStack,
  processedCount,
  processingStack,
  redoStack,
  undoStack,
};
export type { EditAction, FunctionCall };
