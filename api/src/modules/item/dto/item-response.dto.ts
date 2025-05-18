import { ApiProperty } from '@nestjs/swagger';

export class ItemResponseDto {
  @ApiProperty({ description: 'アイテムID', example: 3 })
  id: number;

  @ApiProperty({ description: 'アイテム名', example: 'りんご' })
  name: string;

  @ApiProperty({
    description: 'アイテムのカテゴリ',
    example: 'Food',
    enum: ['Food', 'Drink', 'Snack', 'Spice', 'Other'],
  })
  category: string;

  @ApiProperty({ description: '所属パントリーID', example: 1 })
  pantryId: number;

  @ApiProperty({ description: '数量', example: 5 })
  quantity: number;

  @ApiProperty({ description: '単位', example: '個' })
  unit: string;

  @ApiProperty({ description: '作成日時', example: '2024-01-01T00:00:00Z' })
  createdAt: Date;

  @ApiProperty({ description: '更新日時', example: '2024-01-01T00:00:00Z' })
  updatedAt: Date;

  @ApiProperty({
    description: '賞味期限',
    example: '2024-01-01T00:00:00Z',
    nullable: true,
    required: false,
    type: Date,
  })
  expiresAt: Date | null;
}
