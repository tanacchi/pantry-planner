import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateMessageRequestDto {
  @ApiProperty({ description: 'ユーザーID', example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ description: 'メッセージ内容', example: 'Hello, World!' })
  @IsString()
  message: string;
}
