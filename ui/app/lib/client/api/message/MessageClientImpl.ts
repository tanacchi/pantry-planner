import { User } from "../../../../domain/user";
import { MessageApi } from "../generated";
import { MessageClient } from "./MessageClient";

export class MessageClientImpl implements MessageClient {
  constructor(private readonly api: MessageApi) {}

  sendMessage = async ({
    id,
    message,
  }: {
    id: User["id"];
    message: string;
  }): Promise<void> => {
    console.log("sending message", message);
    await this.api.messageControllerCreateMessage({
      createMessageRequestDto: { userId: id, message },
    });
  };
}
