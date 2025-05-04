import { User } from "../../../../domain/user";
import { MessageApi } from "../generated";
import { MessageClient } from "./MessageClient";

export class MessageClientImpl implements MessageClient {
  constructor(private readonly api: MessageApi) {}

  sendMessage = async (id: User["id"]): Promise<void> => {
    await this.api.messageControllerCreateMessage({
      createMessageRequestDto: { userId: id },
    });
  };
}
