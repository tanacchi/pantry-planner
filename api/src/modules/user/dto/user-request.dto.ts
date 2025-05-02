import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequestDto {
  @ApiProperty({
    description: 'LINE UID',
    example: 'U1234567890abcdef1234567890abcdef',
  })
  @IsString()
  @Length(1, 64)
  lineUid: string;
}
