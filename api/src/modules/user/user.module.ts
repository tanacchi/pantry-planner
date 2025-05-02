import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './application/user.service';
import { UserRepository } from './infrastructure/user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
