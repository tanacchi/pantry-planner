import { UserClient } from "./UserClient";

export class UserClientImpl implements UserClient {
  constructor(private readonly api: UserApi) {}

  async getUserById(id: string): Promise<User> {
    return this.api.getUserById(id);
  }

  async createUser(lineUid: string): Promise<User> {
    return this.api.createUser(lineUid);
  }
}
