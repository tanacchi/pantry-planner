import { Module } from '@nestjs/common';
import { ItemModule } from './modules/item/item.module';

@Module({
  imports: [ItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
