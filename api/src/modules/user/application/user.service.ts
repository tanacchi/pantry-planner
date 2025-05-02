import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../dto/user-request.dto';
import {
  UserDetailResponseDto,
  UserResponseDto,
} from '../dto/user-response.dto';
import { UserDtoMapper } from './mapper/user.dto-mapper';
import { User } from '../domain/entity/user.entity';
import { Pantry } from '../../pantry/domain/entity/pantry.entity';
import { Item } from '../../item/domain/entity/item.entity';
import { Category } from 'src/modules/item/domain/entity/item.entity';

@Injectable()
export class UserService {
  constructor() {}

  createUser(dto: CreateUserRequestDto): UserResponseDto {
    const entity = UserDtoMapper.toDomain(dto);
    // 仮にIDを生成したと仮定
    return UserDtoMapper.toResponseDto({
      ...entity,
      id: 1,
    });
  }

  getUsers(): UserResponseDto[] {
    const mock = new User(
      1,
      'U1234567890abcdef',
      new Date(),
      new Date(),
      new Date(),
    );
    return [UserDtoMapper.toResponseDto(mock)];
  }

  getUser(id: number): UserResponseDto {
    const user = new User(
      id,
      'U1234567890abcdef',
      new Date(),
      new Date(),
      new Date(),
    );
    return UserDtoMapper.toResponseDto(user);
  }

  getUserDetail(id: number): UserDetailResponseDto {
    const user = new User(
      id,
      'U1234567890abcdef',
      new Date(),
      new Date(),
      new Date(),
    );
    const pantry = new Pantry(1, user.id, new Date(), new Date());
    const items: Item[] = [
      new Item(
        1,
        'りんご',
        Category.Food,
        pantry.id,
        3,
        '個',
        new Date(),
        new Date(),
      ),
    ];
    return UserDtoMapper.toDetailResponseDto(user, pantry, items);
  }

  getUserByLineUid(lineUid: string): UserResponseDto {
    const user = new User(1, lineUid, new Date(), new Date(), new Date());
    return UserDtoMapper.toResponseDto(user);
  }

  getUserDetailByLineUid(lineUid: string): UserDetailResponseDto {
    const user = new User(1, lineUid, new Date(), new Date(), new Date());
    const pantry = new Pantry(1, user.id, new Date(), new Date());
    const items: Item[] = [
      new Item(
        2,
        'みかん',
        Category.Food,
        pantry.id,
        5,
        '個',
        new Date(),
        new Date(),
      ),
    ];
    return UserDtoMapper.toDetailResponseDto(user, pantry, items);
  }

  updateUser(id: number, dto: CreateUserRequestDto): UserResponseDto {
    const updated = UserDtoMapper.toDomain(dto);
    return UserDtoMapper.toResponseDto({
      ...updated,
      id,
      updatedAt: new Date(),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteUser(_id: number): void {
    // スタブ：削除処理をここに実装
  }
}
