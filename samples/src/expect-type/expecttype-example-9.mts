// Example: src/expect-type.mts
import { expectType } from 'ts-data-forge';

type ApiResponse =
  | { status: 'ok'; data: string }
  | { status: 'error'; message: string };

const response: ApiResponse = { status: 'ok', data: 'done' };
expectType<typeof response, ApiResponse>('<=');

const summary = {
  response,
};

// embed-sample-code-ignore-below
export { summary };
