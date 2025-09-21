// Sample code extracted from src/others/if-then.mts (ifThen)
// Chaining multiple implications

import { ifThen } from 'ts-data-forge';

// "If A then B" AND "If B then C"
function validateChain(a: boolean, b: boolean, c: boolean): boolean {
  return ifThen(a, b) && ifThen(b, c);
}

validateChain(true, true, true); // true (valid chain)
validateChain(true, false, true); // false (breaks at first implication)
validateChain(false, false, false); // true (vacuously true chain)
