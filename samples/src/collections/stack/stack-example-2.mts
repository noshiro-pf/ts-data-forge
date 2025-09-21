// Sample code extracted from src/collections/stack.mts (stack)
const stack = createStack<string>();

// Add some elements
stack.push('bottom');
stack.push('middle');
stack.push('top');

// Remove elements in LIFO order
const top = stack.pop();
if (top.isSome) {
  console.log(top.value); // "top" (last pushed, first popped)
}

const middle = stack.pop().unwrap(); // "middle"
console.log(stack.size); // 1

// Safe handling of empty stack
const emptyStack = createStack<number>();
const result = emptyStack.pop();
if (result.isNone) {
  console.log('Stack is empty');
}

// Typical usage in algorithms
const pathStack = createStack<string>();
pathStack.push('/home');
pathStack.push('/users');
pathStack.push('/documents');

// Backtrack one level
const currentDir = pathStack.pop().unwrap(); // "/documents"
const parentDir = pathStack.pop().unwrap(); // "/users"
