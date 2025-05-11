import { Injectable } from '@nestjs/common';
import { CreatePantryRequestDto } from '../dto/pantry-request.dto';
import {
  PantryDetailResponseDto,
  PantryResponseDto,
} from '../dto/pantry-response.dto';
import { PantryDtoMapper } from './mapper/pantry.dto-mapper';
import { PantryRepository } from '../infrastructure/pantry.repository';
import { ItemRepository } from 'src/modules/item/infrastructure/item.repository';

@Injectable()
export class PantryService {
  constructor(
    private readonly pantryRepository: PantryRepository,
    private readonly itemRepository: ItemRepository,
  ) {}

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

  async getPantryDetail(id: number): Promise<PantryDetailResponseDto> {
    const pantry = this.pantryRepository.findById(id);
    const items = this.itemRepository.findByPantryId(id);
    const result = await Promise.all([pantry, items]).then(
      ([pantry, items]) => {
        if (!pantry) throw new Error('Pantry not found');
        return PantryDtoMapper.toDetailResponseDto(pantry, items);
      },
    );
    return result;
  }

  async getPantriesByUser(userId: number): Promise<PantryResponseDto[]> {
    const pantries = await this.pantryRepository.findByUserId(userId);
    return pantries.map((pantry) => PantryDtoMapper.toResponseDto(pantry));
  }

  async getPantryDetailsByUser(
    userId: number,
  ): Promise<PantryDetailResponseDto[]> {
    const pantries = await this.pantryRepository.findByUserId(userId);
    const result = pantries.map(async (pantry) => {
      const items = await this.itemRepository.findByPantryId(pantry.id);
      return PantryDtoMapper.toDetailResponseDto(pantry, items);
    });
    return Promise.all(result);
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
