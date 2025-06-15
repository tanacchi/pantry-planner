import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsString, Length } from "class-validator";
import { All_CATEGORIES } from "../../item/domain/entity/item.entity";

export class CreateShoppingItemRequestDto {
  @ApiProperty({ description: "アイテム名", example: "牛乳" })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({
    enum: All_CATEGORIES,
    description: "カテゴリ",
    example: All_CATEGORIES[0],
  })
  @IsIn(All_CATEGORIES)
  category: string;

  @ApiProperty({ description: "ユーザーID", example: 1 })
  @IsInt()
  userId: number;
}

export class UpdateShoppingItemRequestDto extends CreateShoppingItemRequestDto {
  @ApiProperty({ description: "アイテムID", example: 1 })
  @IsInt()
  id: number;
}
