// Example: src/expect-type.mts
import { expectType } from 'ts-data-forge';

expectType<string, string>('=');
expectType<number, number>('=');

const summary = {
  checked: true,
};

// embed-sample-code-ignore-below
export { summary };
