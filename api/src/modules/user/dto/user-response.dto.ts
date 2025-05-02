import { ApiProperty } from '@nestjs/swagger';
import { PantryDetailResponseDto } from '../../pantry/dto/pantry-response.dto';

export class UserResponseDto {
  @ApiProperty({ description: 'ユーザーID', example: 1 })
  id: number;

  @ApiProperty({
    description: 'LINE UID',
    example: 'U1234567890abcdef1234567890abcdef',
  })
  lineUid: string;

  @ApiProperty({ description: '作成日時', example: '2024-01-01T00:00:00Z' })
  createdAt: string;

  @ApiProperty({ description: '更新日時', example: '2024-01-01T00:00:00Z' })
  updatedAt: string;

  @ApiProperty({
    description: '最終ログイン日時',
    example: '2024-01-02T00:00:00Z',
  })
  lastLoginAt: string;
}

export class UserDetailResponseDto extends UserResponseDto {
  @ApiProperty({
    description: 'ユーザーに紐づくパントリー',
    type: PantryDetailResponseDto,
  })
  pantry: PantryDetailResponseDto;
}
