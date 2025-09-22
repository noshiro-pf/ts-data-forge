// Sample code extracted from src/guard/is-non-empty-string.mts (isNonEmptyString)
// Form validation patterns:

import { isNonEmptyString } from 'ts-data-forge';

interface FormData {
  name?: string;
  email?: string;
  phone?: string;
}

function validateForm(data: FormData): string[] {
  const errors: string[] = [];

  if (!isNonEmptyString(data.name)) {
    errors.push('Name is required');
  }

  if (!isNonEmptyString(data.email)) {
    errors.push('Email is required');
  } else if (!data.email.includes('@')) {
    // Safe to access string methods after guard
    errors.push('Invalid email format');
  }

  return errors;
}

export { validateForm };
export type { FormData };
