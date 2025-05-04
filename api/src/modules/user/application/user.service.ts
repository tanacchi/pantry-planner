import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../dto/user-request.dto';
import {
  UserDetailResponseDto,
  UserResponseDto,
} from '../dto/user-response.dto';
import { UserDtoMapper } from './mapper/user.dto-mapper';
import { UserRepository } from '../infrastructure/user.repository';
import { PantryRepository } from 'src/modules/pantry/infrastructure/pantry.repository';
import { ItemRepository } from 'src/modules/item/infrastructure/item.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly pantryRepository: PantryRepository,
    private readonly itemRepository: ItemRepository,
  ) {}

  async createUser(dto: CreateUserRequestDto): Promise<UserResponseDto> {
    const entity = UserDtoMapper.toDomain(dto);
    const created = await this.userRepository.create(entity.lineUid);
    return UserDtoMapper.toResponseDto(created);
  }

  async getUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => UserDtoMapper.toResponseDto(user));
  }

  async getUser(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');
    return UserDtoMapper.toResponseDto(user);
  }

  async getUserDetail(id: number): Promise<UserDetailResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');
    const pantry = await this.pantryRepository.findByUserId(user.id);
    if (!pantry) throw new Error('Pantry not found');
    const items = await this.itemRepository.findByPantryId(pantry[0].id);
    return UserDtoMapper.toDetailResponseDto(user, pantry[0], items);
  }

  async getUserByLineUid(lineUid: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findByLineUid(lineUid);
    if (!user) throw new Error('User not found');
    return UserDtoMapper.toResponseDto(user);
  }

  async getUserDetailByLineUid(
    lineUid: string,
  ): Promise<UserDetailResponseDto> {
    const user = await this.userRepository.findByLineUid(lineUid);
    if (!user) throw new Error('User not found');
    const pantry = await this.pantryRepository.findByUserId(user.id);
    if (!pantry) throw new Error('Pantry not found');
    const items = await this.itemRepository.findByPantryId(pantry[0].id);
    return UserDtoMapper.toDetailResponseDto(user, pantry[0], items);
  }

  async updateUser(
    id: number,
    dto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) throw new Error('User not found');
    const updated = await this.userRepository.update(
      UserDtoMapper.toUpdateDomain(existingUser, dto),
    );
    return UserDtoMapper.toResponseDto(updated);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
