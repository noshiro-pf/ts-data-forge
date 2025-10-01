// Example: src/guard/is-non-empty-string.mts
import { isNonEmptyString } from 'ts-data-forge';

const maybeString: string | null = 'hello';
const result = isNonEmptyString(maybeString) ? maybeString : undefined;

const summary = {
  result,
};

// embed-sample-code-ignore-below
export { summary };

