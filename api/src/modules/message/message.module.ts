import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageRepository } from './message.repository';
import { UserRepository } from '../user/infrastructure/user.repository';

@Module({
  imports: [],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository, UserRepository],
})
export class MessageModule {}
