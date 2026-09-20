import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDateString, IsIn, IsInt, IsOptional, IsString, Length } from "class-validator";
import { All_CATEGORIES, type ItemCategory } from "../domain/entity/item.entity";

export class CreateItemRequestDto {
  @ApiProperty({ description: "アイテム名", example: "りんご" })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({
    enum: All_CATEGORIES,
    description: "カテゴリ",
    example: All_CATEGORIES[0],
  })
  @IsIn(All_CATEGORIES)
  category: ItemCategory;

  @ApiProperty({ description: "パントリーID", example: 1 })
  @IsInt()
  pantryId: number;

  @ApiProperty({ description: "数量", example: 3 })
  @IsInt()
  quantity: number;

  @ApiProperty({ description: "単位", example: "個" })
  @IsString()
  @Length(1, 10)
  unit: string;

  @ApiProperty({
    description: "賞味期限",
    example: "2024-01-01",
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsDateString({ strict: true })
  // FIXME: mapper での変換を不要にしたい
  @Transform(({ value }) => (value ? new Date(value) : null))
  expiresAt?: Date | null = null;
}

export class UpdateItemRequestDto extends CreateItemRequestDto {
  @ApiProperty({ description: "アイテムID", example: 1 })
  @IsInt()
  id: number;
}
