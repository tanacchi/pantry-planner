import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, IsOptional } from 'class-validator';

export class PantryDTO {
  @ApiProperty({
    description: 'The unique identifier for the pantry',
    example: 2,
  })
  @IsInt({ message: 'id must be an integer' })
  id: number;
  @ApiProperty({
    description: 'The items in the pantry',
    type: 'array',
    items: { type: 'object' },
  })
  @IsOptional()
  items?: any[]; // Ensure ApiProperty decorator is applied

  @ApiProperty({
    description: 'The user ID who owns the pantry',
    example: 1,
  })
  @IsInt({ message: 'userId must be an integer' })
  userId: number;

  @ApiProperty({
    description: 'The creation date of the pantry',
    example: '2025-01-01T00:00:00Z',
  })
  @IsDateString({ message: 'createdAt must be a valid ISO 8601 date string' })
  createdAt: string;

  @ApiProperty({
    description: 'The last update date of the pantry',
    example: '2025-01-01T00:00:00Z',
  })
  @IsDateString({ message: 'updatedAt must be a valid ISO 8601 date string' })
  updatedAt: string;
}

export class PantryDetailDTO extends PantryDTO {
}
