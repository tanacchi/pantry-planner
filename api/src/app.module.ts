import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ItemModule } from './modules/item/item.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PantryModule } from './modules/pantry/pantry.module';

@Module({
  imports: [ItemModule, PantryModule],
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
