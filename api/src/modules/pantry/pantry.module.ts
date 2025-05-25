import { Module } from '@nestjs/common';
import { PantryController } from './pantry.controller';
import { PantryService } from './application/pantry.service';
import { PantryRepository } from './infrastructure/pantry.repository';
import { ItemRepository } from '../item/infrastructure/item.repository';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PantryController],
  providers: [PantryService, PantryRepository, ItemRepository],
})
export class PantryModule {}
