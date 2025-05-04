import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateMessageRequestDto {
  @ApiProperty({ description: 'ユーザーID', example: 1 })
  @IsInt()
  userId: number;
}
