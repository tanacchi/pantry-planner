import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ItemModule } from './modules/item/item.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [ItemModule],
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
