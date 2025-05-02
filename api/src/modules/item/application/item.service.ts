import { Injectable } from '@nestjs/common';
import { CreateItemRequestDto } from '../dto/item-request.dto';
import { ItemDtoMapper } from './mapper/item.dto-mapper';
import { ItemResponseDto } from '../dto/item-response.dto';

@Injectable()
export class ItemService {
  constructor() {}

  createItem(item: CreateItemRequestDto): ItemResponseDto {
    // DTOをドメインオブジェクトに変換
    const domainItem = ItemDtoMapper.toDomain(item);
    // ここでアイテムをデータベースに保存する処理を実装します
    // 例えば、TypeORMやMongooseを使用してデータベースに保存することができます
    return ItemDtoMapper.toPersistence(domainItem); // 仮の実装として、受け取ったアイテムをそのまま返します
  }
}
