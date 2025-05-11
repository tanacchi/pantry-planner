import { User } from "../../../../domain/user";
import { UserApi, UserDetailResponseDto } from "../generated";
import { responseToPantry } from "../pantry/PantryClientImpl";
import { UserClient } from "./UserClient";

export class UserClientImpl implements UserClient {
  constructor(private readonly api: UserApi) {}

  async getUserById(id: number): Promise<User> {
    return this.api
      .userControllerGetUserDetail({ id })
      .then((res) => responseToUser(res))
      .catch((err) => {
        console.error("Error fetching user by ID:", err);
        throw err;
      });
  }

  async getUserByLineUid(lineUid: string): Promise<User> {
    try {
      const res = await this.api.userControllerGetUserDetailByLineUid({
        lineUid,
      });
      return responseToUser(res);
    } catch (err) {
      console.error("Error fetching user by line UID:", err);
      throw err;
    }
  }

  async createUser(lineUid: string): Promise<User> {
    const user = await this.api
      .userControllerCreateUser({ createUserRequestDto: { lineUid } })
      .catch((err) => {
        console.error("Error creating user:", err);
        throw err;
      });
     return responseToUser(user);
  }
}

const responseToUser = (res: UserDetailResponseDto): User => {
  return new User(
    res.id,
    res.lineUid,
    new Date(res.createdAt),
    new Date(res.updatedAt),
    new Date(res.lastLoginAt),
    responseToPantry(res.pantry)
  );
};
