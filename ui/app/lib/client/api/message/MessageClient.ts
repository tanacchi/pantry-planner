import { User } from "../../../../domain/user";

export interface MessageClient {
  sendMessage: (params: {id: User["id"], message: string}) => Promise<void>;
}
