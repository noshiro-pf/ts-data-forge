// Sample code extracted from src/guard/is-non-empty-string.mts (isNonEmptyString)
// Working with literal string types:

import { isNonEmptyString } from 'ts-data-forge';

type Status = 'active' | 'inactive' | '' | null;
const status: Status = getStatus();

if (isNonEmptyString(status)) {
  // status is now typed as "active" | "inactive"
  console.log(`Status is: ${status}`);
}
