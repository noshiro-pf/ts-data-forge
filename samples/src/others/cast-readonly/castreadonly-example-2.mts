// Sample code extracted from src/others/cast-readonly.mts (castReadonly)
// Protecting function return values

import { castReadonly } from 'ts-data-forge';

// Prevent callers from mutating internal state
class UserService {
  private users: User[] = [];

  getUsers(): readonly User[] {
    return castReadonly(this.users); // Callers can't mutate the array
  }
}

const service = new UserService();
const users = service.getUsers();
// users.push(newUser); // ❌ TypeScript prevents this
