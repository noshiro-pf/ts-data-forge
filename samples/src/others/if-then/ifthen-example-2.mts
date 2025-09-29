// Example: src/others/if-then.mts (ifThen)
// Validation logic - "if required then must have value"

import { ifThen } from 'ts-data-forge';

function validateField(value: string, isRequired: boolean): boolean {
  const hasValue = value.trim().length > 0;
  return ifThen(isRequired, hasValue);
}

validateField('hello', true); // true (required and has value)
validateField('', true); // false (required but no value)
validateField('', false); // true (not required, so valid)
validateField('hello', false); // true (not required, but has value is fine)

export { validateField };
