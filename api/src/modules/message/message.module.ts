import { Module } from "@nestjs/common";
import { UserRepository } from "../user/infrastructure/user.repository";
import { MessageController } from "./message.controller";
import { MessageRepository } from "./message.repository";
import { MessageService } from "./message.service";

@Module({
  imports: [],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository, UserRepository],
})
export class MessageModule {}
