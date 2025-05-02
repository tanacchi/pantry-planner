import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './application/item.service';
import { ItemRepository } from './infrastructure/item.repository';

@Module({
  imports: [],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
})
export class ItemModule {}
