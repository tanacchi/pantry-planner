import { Module } from "@nestjs/common";
import { PrismaModule } from "../../infrastructure/prisma/prisma.module";
import { ShoppingItemService } from "./application/shopping-item.service";
import { ShoppingItemRepository } from "./infrastructure/shopping-item.repository";
import { ShoppingItemController } from "./shopping-item.controller";

@Module({
  imports: [PrismaModule],
  controllers: [ShoppingItemController],
  providers: [ShoppingItemService, ShoppingItemRepository],
  exports: [ShoppingItemService],
})
export class ShoppingItemModule {}
