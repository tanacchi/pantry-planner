import { Module } from "@nestjs/common";
import { PrismaModule } from "../../infrastructure/prisma/prisma.module";
import { ItemRepository } from "../item/infrastructure/item.repository";
import { PantryRepository } from "../pantry/infrastructure/pantry.repository";
import { UserService } from "./application/user.service";
import { UserRepository } from "./infrastructure/user.repository";
import { UserController } from "./user.controller";

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, PantryRepository, ItemRepository],
})
export class UserModule {}
