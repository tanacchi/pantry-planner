import { User } from "../../../../domain/user";

export interface UserClient {
  getUserById: (id: User["id"]) => Promise<User>;
  getUserByLineUid: (lineUid: User["lineUid"]) => Promise<User>;
  createUser: (lineUid: User["lineUid"]) => Promise<User>;
}
