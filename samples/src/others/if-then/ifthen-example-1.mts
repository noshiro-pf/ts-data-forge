// Example: src/others/if-then.mts (ifThen)
// Basic truth table demonstration

import { ifThen } from 'ts-data-forge';

ifThen(true, true); // true  (if true then true = true)
ifThen(true, false); // false (if true then false = false)
ifThen(false, true); // true  (if false then true = true - vacuously true)
ifThen(false, false); // true  (if false then false = true - vacuously true)
