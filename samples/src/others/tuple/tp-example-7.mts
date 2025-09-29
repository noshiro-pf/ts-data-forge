// Example: src/others/tuple.mts (tp)
// Common patterns and use cases

import { tp } from 'ts-data-forge';

// React-style state tuples
const useState = <T,>(initial: T) => tp(initial, (value: T) => void 0);
const [count, setCount] = useState(0);

// Redux-style actions
const incrementAction = tp('INCREMENT', { amount: 1 });
const decrementAction = tp('DECREMENT', { amount: 1 });

// Database query results
const queryResult = tp(
  true, // success
  [{ id: 1, name: 'John' }], // data
  null, // error
);

// Configuration flags
const features = tp('darkMode', 'analytics', 'notifications');
const enabledFeatures = features.filter((f) => isEnabled(f));

export {
  count,
  decrementAction,
  enabledFeatures,
  features,
  incrementAction,
  queryResult,
  setCount,
  useState,
};
