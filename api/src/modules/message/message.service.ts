import { Injectable } from "@nestjs/common";
import type { UserRepository } from "../user/infrastructure/user.repository";
import type { CreateMessageRequestDto } from "./dto";
import type { MessageRepository } from "./message.repository";

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository
  ) {}

  async send(dto: CreateMessageRequestDto): Promise<void> {
    if (!dto.userId) {
      throw new Error("ユーザーIDが必要です");
    }
    const user = await this.userRepository.findById(Number(dto.userId));
    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }
    await this.messageRepository.send(user.lineUid, dto.message);
  }
}
