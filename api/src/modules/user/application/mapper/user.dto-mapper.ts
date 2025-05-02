import { Pantry } from '../../../pantry/domain/entity/pantry.entity';
import { PantryDtoMapper } from '../../../pantry/application/mapper/pantry.dto-mapper';
import { User } from '../../domain/entity/user.entity';
import { CreateUserRequestDto } from '../../dto/user-request.dto';
import {
  UserDetailResponseDto,
  UserResponseDto,
} from '../../dto/user-response.dto';
import { Item } from '../../..//item/domain/entity/item.entity';

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

  static toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      lineUid: user.lineUid,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      lastLoginAt: user.lastLoginAt.toISOString(),
    };
  }

  static toDetailResponseDto(
    user: User,
    pantry: Pantry,
    items: Item[],
  ): UserDetailResponseDto {
    return {
      ...this.toResponseDto(user),
      pantry: PantryDtoMapper.toDetailResponseDto(pantry, items),
    };
  }
}
