import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreatePantryRequestDto {
  @ApiProperty({ description: "所有者ユーザーID", example: 1 })
  @IsInt()
  userId: number;
}
