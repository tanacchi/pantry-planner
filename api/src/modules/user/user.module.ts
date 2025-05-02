import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './application/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
