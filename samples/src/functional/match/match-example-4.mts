// Sample code extracted from src/functional/match.mts (match)
// HTTP status code handling:

import { match } from 'ts-data-forge';

type HttpStatus = 200 | 404 | 500;
const status: HttpStatus = 404;

const response = match(String(status), {
  '200': { ok: true, message: 'Success' },
  '404': { ok: false, message: 'Not Found' },
  '500': { ok: false, message: 'Server Error' },
});
// All cases covered, no default needed
// Result: { ok: false, message: 'Not Found' }

export { response, status };
export type { HttpStatus };
