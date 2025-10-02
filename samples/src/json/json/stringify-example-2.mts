// Example: src/json/json.mts
import { Json } from 'ts-data-forge';

const parsed = Json.parse('{"id":1,"name":"Ada"}');
const stringified = Json.stringify({ id: 1, name: 'Ada' });
const selected = Json.stringifySelected({ id: 1, name: 'Ada', role: 'admin' }, [
  'name',
]);

const summary = {
  parsed,
  selected,
  stringified,
};

// embed-sample-code-ignore-below
export { summary };
