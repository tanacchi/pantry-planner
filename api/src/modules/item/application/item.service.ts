import { Injectable } from '@nestjs/common';
import { CreateItemRequestDto } from '../dto/item-request.dto';
import { ItemResponseDto } from '../dto/item-response.dto';
import { ItemDtoMapper } from './mapper/item.dto-mapper';
import { ItemRepository } from '../infrastructure/item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  createItem(item: CreateItemRequestDto): ItemResponseDto {
    // DTO → ドメインエンティティへ変換
    const domainItem = ItemDtoMapper.toDomain(item);

    // TODO: repository.save(domainItem);
    // 例: this.itemRepository.save(domainItem);

    // 保存結果をドメインオブジェクトとして取得した前提で DTO に変換
    return ItemDtoMapper.toResponseDto(domainItem); // 仮実装：保存せずに変換
  }

  getItem(id: number): ItemResponseDto {
    // TODO: repository.findById(id)
    // const domainItem = this.itemRepository.findById(id);
    const mockItem = ItemDtoMapper.toDomain({
      name: 'りんご',
      category: 'Food',
      pantryId: 1,
      quantity: 5,
      unit: '個',
      expiresAt: null,
    });
    return ItemDtoMapper.toResponseDto({
      ...mockItem,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getItems(_filter: {
    name?: string[];
    category?: string[];
  }): ItemResponseDto[] {
    // TODO: repository.findByFilter(filter)
    return [this.getItem(1), this.getItem(2)];
  }

  updateItem(id: number, dto: CreateItemRequestDto): ItemResponseDto {
    // DTO → Entity → Save
    const updated = ItemDtoMapper.toDomain(dto);
    return ItemDtoMapper.toResponseDto({
      ...updated,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteItem(_id: number): void {
    // TODO: this.itemRepository.delete(id)
  }

  getItemsByPantry(pantryId: number): ItemResponseDto[] {
    // TODO: repository.findByPantryId(pantryId)
    const mockItem = ItemDtoMapper.toDomain({
      name: 'しょうゆ',
      category: 'Spice',
      pantryId,
      quantity: 1,
      unit: '本',
      expiresAt: new Date('2024-01-01'),
    });
    return [
      ItemDtoMapper.toResponseDto({
        ...mockItem,
        id: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];
  }
}
