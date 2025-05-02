import { Module } from '@nestjs/common';
import { PantryController } from './pantry.controller';
import { PantryService } from './application/pantry.service';

@Module({
  imports: [],
  controllers: [PantryController],
  providers: [PantryService],
})
export class PantryModule {}
