import type { Item } from "../../..//item/domain/entity/item.entity";
import { PantryDtoMapper } from "../../../pantry/application/mapper/pantry.dto-mapper";
import type { Pantry } from "../../../pantry/domain/entity/pantry.entity";
import { User } from "../../domain/entity/user.entity";
import type { CreateUserRequestDto } from "../../dto/user-request.dto";
import type { UserDetailResponseDto, UserResponseDto } from "../../dto/user-response.dto";

export class UserDtoMapper {
  static toDomain(dto: CreateUserRequestDto): User {
    return new User(
      -1, // ID 未発行
      dto.lineUid,
      new Date(), // createdAt
      new Date(), // updatedAt
      new Date(), // lastLoginAt
    );
  }

  static toUpdateDomain(oldUser: User, newUser: CreateUserRequestDto): User {
    return {
      ...oldUser,
      ...newUser,
    };
  }

  static toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      lineUid: user.lineUid,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      lastLoginAt: user.lastLoginAt.toISOString(),
    };
  }

  static toDetailResponseDto(user: User, pantry: Pantry, items: Item[]): UserDetailResponseDto {
    return {
      ...UserDtoMapper.toResponseDto(user),
      pantry: PantryDtoMapper.toDetailResponseDto(pantry, items),
    };
  }
}
