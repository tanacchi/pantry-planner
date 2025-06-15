import { Module } from "@nestjs/common";
import { PrismaModule } from "../../infrastructure/prisma/prisma.module";
import { ItemRepository } from "../item/infrastructure/item.repository";
import { PantryService } from "./application/pantry.service";
import { PantryRepository } from "./infrastructure/pantry.repository";
import { PantryController } from "./pantry.controller";

@Module({
  imports: [PrismaModule],
  controllers: [PantryController],
  providers: [PantryService, PantryRepository, ItemRepository],
})
export class PantryModule {}
