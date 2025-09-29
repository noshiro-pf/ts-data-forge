// Example: src/guard/is-non-empty-string.mts (isNonEmptyString)
// Filtering arrays of potentially empty strings:

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

for (const response of validResponses) {
  // Each response is guaranteed to be a non-empty string
  console.log(response.trim().toUpperCase());
}

export { responses, validResponses };
