import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDateString } from 'class-validator';

export class ItemDTO {
  @ApiProperty({
    description: 'The unique identifier for the item',
    example: 3,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'The name of the item',
    example: 'Apple',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The category of the item',
    example: 'Food',
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: 'The pantry ID the item belongs to',
    example: 2,
  })
  @IsInt()
  pantryId: number;

  @ApiProperty({
    description: 'The quantity of the item',
    example: 10,
  })
  @IsInt()
  quantity: number;

  @ApiProperty({
    description: 'The unit of the item',
    example: 'kg',
  })
  @IsString()
  unit: string;

  @ApiProperty({
    description: 'The creation date of the item',
    example: '2025-01-01T00:00:00Z',
  })
  @IsDateString()
  createdAt: string;

  @ApiProperty({
    description: 'The last update date of the item',
    example: '2025-01-01T00:00:00Z',
  })
  @IsDateString()
  updatedAt: string;
}
