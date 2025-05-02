import { ApiProperty } from '@nestjs/swagger';
import { ItemResponseDto } from '../../item//dto/item-response.dto';

export class PantryResponseDto {
  @ApiProperty({ description: 'パントリーID', example: 2 })
  id: number;

  @ApiProperty({ description: 'ユーザーID', example: 1 })
  userId: number;

  @ApiProperty({ description: '作成日時', example: '2024-01-01T00:00:00Z' })
  createdAt: string;

  @ApiProperty({ description: '更新日時', example: '2024-01-01T00:00:00Z' })
  updatedAt: string;
}

export class PantryDetailResponseDto extends PantryResponseDto {
  @ApiProperty({
    type: [ItemResponseDto],
    description: 'このパントリーに属するアイテム一覧',
  })
  items: ItemResponseDto[];
}
