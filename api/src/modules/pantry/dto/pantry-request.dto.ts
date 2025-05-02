import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePantryRequestDto {
  @ApiProperty({ description: '所有者ユーザーID', example: 1 })
  @IsInt()
  userId: number;
}
