import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDateString, IsOptional } from 'class-validator';

export class UserDTO {
  @ApiProperty({
    description: 'The unique identifier for the user',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'The LINE UID of the user',
    example: 'U1234567890abcdef1234567890abcdef',
  })
  @IsString()
  lineUid: string;

  @ApiProperty({
    description: 'The creation date of the user',
    example: '2025-01-01T00:00:00Z',
  })
  @IsDateString()
  createdAt: string;

  @ApiProperty({
    description: 'The last update date of the user',
    example: '2025-01-01T00:00:00Z',
  })
  @IsDateString()
  updatedAt: string;

  @ApiProperty({
    description: 'The last login date of the user',
    example: '2025-01-01T00:00:00Z',
  })
  @IsDateString()
  lastLoginAt: string;
}

export class UserDetailDTO extends UserDTO {
  @ApiProperty({
    description: 'The pantry details associated with the user',
    type: 'object',
  })
  @IsOptional()
  pantry: any; // This should be replaced with a proper PantryDetailDTO when defined
}
