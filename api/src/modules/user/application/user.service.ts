import { Injectable } from "@nestjs/common";
import type { ItemRepository } from "../../item/infrastructure/item.repository";
import type { PantryRepository } from "../../pantry/infrastructure/pantry.repository";
import type { CreateUserRequestDto } from "../dto/user-request.dto";
import type { UserDetailResponseDto, UserResponseDto } from "../dto/user-response.dto";
import type { UserRepository } from "../infrastructure/user.repository";
import { UserDtoMapper } from "./mapper/user.dto-mapper";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly pantryRepository: PantryRepository,
    private readonly itemRepository: ItemRepository
  ) {}

  async createUser(dto: CreateUserRequestDto): Promise<UserDetailResponseDto> {
    const entity = UserDtoMapper.toDomain(dto);
    const created = await this.userRepository.create(entity.lineUid);
    const pantry = await this.pantryRepository.create(created.id);
    return UserDtoMapper.toDetailResponseDto(created, pantry, []);
  }

  async getUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => UserDtoMapper.toResponseDto(user));
  }

  async getUser(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");
    return UserDtoMapper.toResponseDto(user);
  }

  async getUserDetail(id: number): Promise<UserDetailResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");
    const pantry = await this.pantryRepository.findByUserId(user.id);
    if (!pantry || pantry.length === 0) throw new Error("Pantry not found");
    const items = await this.itemRepository.findByPantryId(pantry[0].id);
    return UserDtoMapper.toDetailResponseDto(user, pantry[0], items);
  }

  async getUserByLineUid(lineUid: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findByLineUid(lineUid);
    if (!user) throw new Error("User not found");
    return UserDtoMapper.toResponseDto(user);
  }

  async getUserDetailByLineUid(lineUid: string): Promise<UserDetailResponseDto> {
    const user = await this.userRepository.findByLineUid(lineUid);
    console.log("user", user);
    if (!user) throw new Error("User not found");
    const pantry = await this.pantryRepository.findByUserId(user.id);
    if (pantry.length == 0) throw new Error("Pantry not found");
    const items = await this.itemRepository.findByPantryId(pantry[0].id);
    return UserDtoMapper.toDetailResponseDto(user, pantry[0], items);
  }

  async updateUser(id: number, dto: CreateUserRequestDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) throw new Error("User not found");
    const updated = await this.userRepository.update(
      UserDtoMapper.toUpdateDomain(existingUser, dto)
    );
    return UserDtoMapper.toResponseDto(updated);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
