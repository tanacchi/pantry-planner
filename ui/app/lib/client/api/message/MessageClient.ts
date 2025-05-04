import { User } from "../../../../domain/user";

export interface MessageClient {
  sendMessage: (id: User["id"]) => Promise<void>;
}
