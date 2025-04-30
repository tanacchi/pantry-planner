import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PantryModule } from './pantry/pantry.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [UserModule, PantryModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
