import { Injectable } from '@nestjs/common';
import { CreatePantryRequestDto } from '../dto/pantry-request.dto';
import {
  PantryDetailResponseDto,
  PantryResponseDto,
} from '../dto/pantry-response.dto';
import { PantryDtoMapper } from './mapper/pantry.dto-mapper';
import { Pantry } from '../domain/entity/pantry.entity';
import { Item } from '../../item/domain/entity/item.entity';
import { PantryRepository } from '../infrastructure/pantry.repository';

@Injectable()
export class PantryService {
  constructor(private readonly pantryRepository: PantryRepository) {}

  async createPantry(dto: CreatePantryRequestDto): Promise<PantryResponseDto> {
    const entity = await this.pantryRepository.create(dto.userId);
    return PantryDtoMapper.toResponseDto(entity);
  }

  async getPantries(): Promise<PantryResponseDto[]> {
    const pantries = await this.pantryRepository.findAll();
    return pantries.map((pantry) => PantryDtoMapper.toResponseDto(pantry));
  }

  async getPantry(id: number): Promise<PantryResponseDto> {
    const pantry = await this.pantryRepository.findById(id);
    if (!pantry) throw new Error('Pantry not found');
    return PantryDtoMapper.toResponseDto(pantry);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async getPantryDetail(id: number): Promise<PantryDetailResponseDto> {
    const pantry = new Pantry(id, 1, new Date(), new Date());
    const items: Item[] = [
      new Item(1, 'りんご', 'Food', id, 3, '個', new Date(), new Date()),
    ];
    return PantryDtoMapper.toDetailResponseDto(pantry, items);
  }

  async getPantriesByUser(userId: number): Promise<PantryResponseDto[]> {
    const pantries = await this.pantryRepository.findByUserId(userId);
    return pantries.map((pantry) => PantryDtoMapper.toResponseDto(pantry));
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async getPantryDetailsByUser(
    userId: number,
  ): Promise<PantryDetailResponseDto[]> {
    const pantry = new Pantry(20, userId, new Date(), new Date());
    const items: Item[] = [
      new Item(1, 'みかん', 'Food', pantry.id, 2, '個', new Date(), new Date()),
    ];
    return [PantryDtoMapper.toDetailResponseDto(pantry, items)];
  }

  async updatePantry(
    id: number,
    dto: CreatePantryRequestDto,
  ): Promise<PantryResponseDto> {
    const existingPantry = await this.pantryRepository.findById(id);
    if (!existingPantry) throw new Error('Item not found');
    const updated = await this.pantryRepository.update(
      PantryDtoMapper.toUpdateDomain(existingPantry, dto),
    );
    return PantryDtoMapper.toResponseDto(updated);
  }

  async deletePantry(id: number): Promise<void> {
    await this.pantryRepository.delete(id);
  }
}
