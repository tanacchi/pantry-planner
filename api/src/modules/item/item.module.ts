import { Module } from "@nestjs/common";
import { PrismaModule } from "../../infrastructure/prisma/prisma.module";
import { ItemService } from "./application/item.service";
import { ItemRepository } from "./infrastructure/item.repository";
import { ItemController } from "./item.controller";

@Module({
  imports: [PrismaModule],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
})
export class ItemModule {}
