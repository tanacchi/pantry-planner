import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './application/user.service';
import { UserRepository } from './infrastructure/user.repository';
import { PantryRepository } from '../pantry/infrastructure/pantry.repository';
import { ItemRepository } from '../item/infrastructure/item.repository';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, PantryRepository, ItemRepository],
})
export class UserModule {}
