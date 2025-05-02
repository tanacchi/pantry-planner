import { Item } from '../../domain/entity/item.entity';
import { CreateItemRequestDto } from '../../dto/item-request.dto';
import { ItemResponseDto } from '../../dto/item-response.dto';

export class ItemDtoMapper {
  static toDomain(itemDto: CreateItemRequestDto): Item {
    return {
      id: 0, // IDはデータベースに保存した後に取得するため、仮の値を設定
      name: itemDto.name,
      category: itemDto.category,
      pantryId: itemDto.pantryId,
      quantity: itemDto.quantity,
      unit: itemDto.unit,
      createdAt: new Date().toISOString(), // 作成日時は現在の日時を設定
      updatedAt: new Date().toISOString(), // 更新日時も現在の日時を設定
    };
  }

  static toPersistence(item: Item): ItemResponseDto {
    return {
      id: item.id,
      name: item.name,
      category: item.category,
      pantryId: item.pantryId,
      quantity: item.quantity,
      unit: item.unit,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }
}
