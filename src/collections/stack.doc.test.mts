import { Optional } from '../index.mjs';
import { createStack } from './stack.mjs';

describe('createStack', () => {
  test('JSDoc example 1', () => {
    const stack = createStack<string>();
    stack.push('first');
    stack.push('second');

    assert(Optional.unwrap(stack.pop()) === 'second'); // LIFO order
    assert(stack.size === 1);

    // Undo functionality example
    const undoStack = createStack<{ action: string }>();
    undoStack.push({ action: 'delete' });
    if (!undoStack.isEmpty) {
      const lastAction = Optional.unwrap(undoStack.pop());
      assert(lastAction.action === 'delete');
    }
  });

  test('JSDoc example 2', () => {
    const stack = createStack<string>();
    stack.push('first');
    stack.push('second');

    const top = stack.pop();
    assert(Optional.isSome(top));
    assert(Optional.unwrap(top) === 'second');

    const empty = createStack<number>();
    assert(Optional.isNone(empty.pop()));
  });

  test('JSDoc example 3', () => {
    const stack = createStack<string>();
    stack.push('first');
    stack.push('second');

    assert(stack.size === 2);
    assert(Optional.unwrap(stack.pop()) === 'second'); // Last in, first out
  });

  test('JSDoc example 4', () => {
    const stack = createStack<string>();
    stack.push('first');
    stack.push('second');
    assert(Optional.unwrap(stack.pop()) === 'second');

    // With initial values
    const prePopulated = createStack(['a', 'b', 'c']);
    assert(prePopulated.size === 3);
    assert(Optional.unwrap(prePopulated.pop()) === 'c'); // Last element first
  });
});
