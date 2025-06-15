import type { Item } from "../../domain/entity/item.entity";
import type { CreateItemRequestDto } from "../../dto/item-request.dto";
import type { ItemResponseDto } from "../../dto/item-response.dto";

export class ItemDtoMapper {
  static toDomain(itemDto: CreateItemRequestDto): Item {
    return {
      id: 0, // IDはデータベースに保存した後に取得するため、仮の値を設定
      name: itemDto.name,
      category: itemDto.category,
      pantryId: itemDto.pantryId,
      quantity: itemDto.quantity,
      unit: itemDto.unit,
      createdAt: new Date(),
      updatedAt: new Date(),
      expiresAt: itemDto.expiresAt ? new Date(itemDto.expiresAt) : null,
    };
  }

  static toUpdateDomain(oldItem: Item, newItem: CreateItemRequestDto): Item {
    return {
      ...oldItem,
      ...newItem,
    };
  }

  static toResponseDto(item: Item): ItemResponseDto {
    return {
      id: item.id,
      name: item.name,
      category: item.category,
      pantryId: item.pantryId,
      quantity: item.quantity,
      unit: item.unit,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
      expiresAt: item.expiresAt ? new Date(item.expiresAt) : null,
    };
  }
}
