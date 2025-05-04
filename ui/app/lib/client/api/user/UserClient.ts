export interface UserClient {
  getUserById: (id: string) => Promise<User>;
  createUser: (lineUid: string) => Promise<User>;
}
