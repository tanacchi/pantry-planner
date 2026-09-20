import { type MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { PrismaModule } from "./infrastructure/prisma/prisma.module";
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { HealthModule } from "./modules/health/health.module";
import { ItemModule } from "./modules/item/item.module";
import { MessageModule } from "./modules/message/message.module";
import { PantryModule } from "./modules/pantry/pantry.module";
import { ShoppingItemModule } from "./modules/shopping-item/shopping-item.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    ItemModule,
    PantryModule,
    UserModule,
    PrismaModule,
    MessageModule,
    ShoppingItemModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
