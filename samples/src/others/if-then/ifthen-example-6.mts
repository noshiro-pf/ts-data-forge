// Sample code extracted from src/others/if-then.mts (ifThen)
// Negation patterns

import { ifThen } from 'ts-data-forge';

// "If not expired then valid" is equivalent to "expired OR valid"
const isExpired = Date.now() > expiryDate;
const isValid = checkValidity();
const result = ifThen(!isExpired, isValid);
// Same as: isExpired || isValid

export { isExpired, isValid, result };
