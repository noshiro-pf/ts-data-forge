import { isNonEmptyString } from './is-non-empty-string.mjs';

describe('isNonEmptyString', () => {
  test('Basic usage with different string types:', () => {
    assert(isNonEmptyString('hello') === true); // true
    assert(isNonEmptyString(' ') === true); // true (whitespace is considered non-empty)
    assert(isNonEmptyString('\t\n') === true); // true (whitespace characters are non-empty)
    assert(isNonEmptyString('') === false); // false
    assert(isNonEmptyString(null) === false); // false
    assert(isNonEmptyString(undefined) === false); // false
  });

  test('Type guard usage with nullable strings:', () => {
    const userInput: string | null | undefined = 'hello';

    if (isNonEmptyString(userInput)) {
      // userInput is now typed as non-empty string
      assert(userInput.charAt(0) === 'h'); // Safe to access string methods
      assert(userInput.toUpperCase() === 'HELLO'); // No need for null checks
      const length = userInput.length; // Guaranteed to be > 0
      assert(length === 5);
    } else {
      assert(false); // should not reach here
    }
  });

  test('Working with literal string types:', () => {
    type Status = 'active' | 'inactive' | '' | null;
    const status: Status = 'active';

    if (isNonEmptyString(status)) {
      // status is now typed as "active" | "inactive"
      assert(status === 'active' || status === 'inactive');
    }
  });

  test('Form validation patterns:', () => {
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
  });

  test('Filtering arrays of potentially empty strings:', () => {
    const responses: (string | null | undefined)[] = [
      'hello',
      '',
      'world',
      null,
      undefined,
      ' ',
    ];

    const validResponses = responses.filter(isNonEmptyString);
    // validResponses is now string[] containing ["hello", "world", " "]

    validResponses.forEach((response) => {
      // Each response is guaranteed to be a non-empty string
      console.log(response.trim().toUpperCase());
    });
  });
});
