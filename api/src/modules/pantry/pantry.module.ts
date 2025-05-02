import { Module } from '@nestjs/common';
import { PantryController } from './pantry.controller';
import { PantryService } from './application/pantry.service';
import { PantryRepository } from './infrastructure/pantry.repository';

@Module({
  imports: [],
  controllers: [PantryController],
  providers: [PantryService, PantryRepository],
})
export class PantryModule {}
