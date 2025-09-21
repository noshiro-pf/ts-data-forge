// Sample code extracted from src/guard/key-is-in.mts (keyIsIn)
// Form field validation:

import { keyIsIn } from 'ts-data-forge';

interface FormData {
  name: string;
  email: string;
  age: number;
}

const formData: FormData = getFormData();
const requiredFields: readonly string[] = ['name', 'email'] as const;

function validateRequiredFields(data: FormData): string[] {
  const errors: string[] = [];

  for (const field of requiredFields) {
    if (keyIsIn(field, data)) {
      // field is now narrowed to keyof FormData
      const value = data[field];

      if (typeof value === 'string' && value.trim() === '') {
        errors.push(`${field} is required`);
      }
    }
  }

  return errors;
}
