import { ItemDtoMapper } from "../../../item/application/mapper/item.dto-mapper";
import type { Item } from "../../../item/domain/entity/item.entity";
import { Pantry } from "../../domain/entity/pantry.entity";
import type { CreatePantryRequestDto } from "../../dto/pantry-request.dto";
import type { PantryDetailResponseDto, PantryResponseDto } from "../../dto/pantry-response.dto";

export class PantryDtoMapper {
  static toDomain(dto: CreatePantryRequestDto): Pantry {
    return new Pantry(
      -1, // IDはまだ発行されていない
      dto.userId,
      new Date(), // 仮のcreatedAt
      new Date()
    );
  }

  static toUpdateDomain(oldEntity: Pantry, newEntity: CreatePantryRequestDto): Pantry {
    return {
      ...oldEntity,
      ...newEntity,
    };
  }

  static toResponseDto(entity: Pantry): PantryResponseDto {
    return {
      id: entity.id,
      userId: entity.userId,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  static toDetailResponseDto(entity: Pantry, items: Item[]): PantryDetailResponseDto {
    return {
      ...this.toResponseDto(entity),
      items: items.map((item) => ItemDtoMapper.toResponseDto(item)),
    };
  }
}
