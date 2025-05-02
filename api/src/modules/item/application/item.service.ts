import { Injectable } from '@nestjs/common';
import { CreateItemRequestDto } from '../dto/item-request.dto';
import { ItemResponseDto } from '../dto/item-response.dto';
import { ItemDtoMapper } from './mapper/item.dto-mapper';
import { ItemRepository } from '../infrastructure/item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async createItem(dto: CreateItemRequestDto): Promise<ItemResponseDto> {
    const domainItem = ItemDtoMapper.toDomain(dto);
    const created = await this.itemRepository.create(domainItem);
    return ItemDtoMapper.toResponseDto(created);
  }

  async getItem(id: number): Promise<ItemResponseDto> {
    const item = await this.itemRepository.findById(id);
    if (!item) throw new Error('Item not found');
    return ItemDtoMapper.toResponseDto(item);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getItems(_filter: {
    name?: string[];
    category?: string[];
  }): Promise<ItemResponseDto[]> {
    const items = await this.itemRepository.findAll();
    return items.map((item) => ItemDtoMapper.toResponseDto(item));
  }

  async updateItem(
    id: number,
    dto: CreateItemRequestDto,
  ): Promise<ItemResponseDto> {
    const updated = await this.itemRepository.update(
      ItemDtoMapper.toDomain(dto),
    );
    return ItemDtoMapper.toResponseDto(updated);
  }

  async deleteItem(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }

  async getItemsByPantry(pantryId: number): Promise<ItemResponseDto[]> {
    const items = await this.itemRepository.findByPantryId(pantryId);
    return items.map((item) => ItemDtoMapper.toResponseDto(item));
  }
}
