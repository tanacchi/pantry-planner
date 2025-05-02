import { Injectable } from '@nestjs/common';
import { CreatePantryRequestDto } from '../dto/pantry-request.dto';
import {
  PantryDetailResponseDto,
  PantryResponseDto,
} from '../dto/pantry-response.dto';
import { PantryDtoMapper } from './mapper/pantry.dto-mapper';
import { Pantry } from '../domain/entity/pantry.entity';
import { Category, Item } from '../../item/domain/entity/item.entity';

@Injectable()
export class PantryService {
  constructor() {}

  createPantry(dto: CreatePantryRequestDto): PantryResponseDto {
    const entity = PantryDtoMapper.toDomain(dto);
    // TODO: this.pantryRepository.save(entity)
    return PantryDtoMapper.toResponseDto({
      ...entity,
      id: 1, // 仮ID
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  getPantries(): PantryResponseDto[] {
    const mock = new Pantry(1, 1, new Date(), new Date());
    return [PantryDtoMapper.toResponseDto(mock)];
  }

  getPantry(id: number): PantryResponseDto {
    const pantry = new Pantry(id, 1, new Date(), new Date());
    return PantryDtoMapper.toResponseDto(pantry);
  }

  getPantryDetail(id: number): PantryDetailResponseDto {
    const pantry = new Pantry(id, 1, new Date(), new Date());
    const items: Item[] = [
      new Item(1, 'りんご', Category.Food, id, 3, '個', new Date(), new Date()),
    ];
    return PantryDtoMapper.toDetailResponseDto(pantry, items);
  }

  getPantriesByUser(userId: number): PantryResponseDto[] {
    const pantry = new Pantry(10, userId, new Date(), new Date());
    return [PantryDtoMapper.toResponseDto(pantry)];
  }

  getPantryDetailsByUser(userId: number): PantryDetailResponseDto[] {
    const pantry = new Pantry(20, userId, new Date(), new Date());
    const items: Item[] = [
      new Item(
        1,
        'みかん',
        Category.Food,
        pantry.id,
        2,
        '個',
        new Date(),
        new Date(),
      ),
    ];
    return [PantryDtoMapper.toDetailResponseDto(pantry, items)];
  }

  updatePantry(id: number, dto: CreatePantryRequestDto): PantryResponseDto {
    const updated = PantryDtoMapper.toDomain(dto);
    return PantryDtoMapper.toResponseDto({
      ...updated,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deletePantry(_id: number): void {
    // TODO: repository.delete(id)
  }
}
