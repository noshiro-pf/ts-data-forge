// Sample code extracted from src/json/json.mts (stringifySelected)
import { Json, Result } from 'ts-data-forge';

const user = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  password: 'secret123',
};

const publicFields = Json.stringifySelected(user, ['id', 'name', 'email']);
if (Result.isOk(publicFields)) {
  console.log(publicFields.value);
  // '{"id":1,"name":"Alice","email":"alice@example.com"}'
}
