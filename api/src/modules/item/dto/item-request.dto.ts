import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

enum Category {
  Food = 'Food',
  Drink = 'Drink',
  Snack = 'Snack',
  Spice = 'Spice',
  Other = 'Other',
}

export class CreateItemRequestDto {
  @ApiProperty({ description: 'アイテム名', example: 'りんご' })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({
    enum: Category,
    description: 'カテゴリ',
    enumName: 'Category',
    example: Category.Food,
  })
  @IsEnum(Category)
  category: Category;

  @ApiProperty({ description: 'パントリーID', example: 1 })
  @IsInt()
  pantryId: number;

  @ApiProperty({ description: '数量', example: 3 })
  @IsInt()
  quantity: number;

  @ApiProperty({ description: '単位', example: '個' })
  @IsString()
  @Length(1, 10)
  unit: string;

  @ApiProperty({
    description: '賞味期限',
    example: '2024-01-01',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsDateString()
  expiresAt?: Date | null = null;
}
