import { ApiProperty } from '@nestjs/swagger';

export class ShoppingItemResponseDto {
  @ApiProperty({ description: 'アイテムID', example: 1 })
  id: number;

  @ApiProperty({ description: 'アイテム名', example: '牛乳' })
  name: string;

  @ApiProperty({ description: 'カテゴリ', example: 'Food' })
  category: string;

  @ApiProperty({ description: 'ユーザーID', example: 1 })
  userId: number;

  @ApiProperty({ description: '作成日時', example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: '更新日時', example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;

  @ApiProperty({ description: '削除日時', example: null, nullable: true })
  deletedAt?: Date | null;
}
