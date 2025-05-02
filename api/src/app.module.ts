import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ItemModule } from './modules/item/item.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PantryModule } from './modules/pantry/pantry.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';

@Module({
  imports: [ItemModule, PantryModule, UserModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
