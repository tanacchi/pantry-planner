import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateUserRequestDto {
  @ApiProperty({
    description: "LINE UID",
    example: "U1234567890abcdef1234567890abcdef",
  })
  @IsString()
  @Length(1, 64)
  lineUid: string;
}
