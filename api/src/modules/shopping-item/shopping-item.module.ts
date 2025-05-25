import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { ShoppingItemController } from './shopping-item.controller';
import { ShoppingItemService } from './application/shopping-item.service';
import { ShoppingItemRepository } from './infrastructure/shopping-item.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ShoppingItemController],
  providers: [ShoppingItemService, ShoppingItemRepository],
  exports: [ShoppingItemService],
})
export class ShoppingItemModule {}
