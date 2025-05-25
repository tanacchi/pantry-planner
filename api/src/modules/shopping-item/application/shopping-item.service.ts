import { Injectable } from '@nestjs/common';
import { ShoppingItemRepository } from '../infrastructure/shopping-item.repository';
import {
  CreateShoppingItemRequestDto,
  UpdateShoppingItemRequestDto,
} from '../dto/shopping-item-request.dto';
import { ShoppingItemResponseDto } from '../dto/shopping-item-response.dto';
import { Category } from '@prisma/client';

@Injectable()
export class ShoppingItemService {
  constructor(
    private readonly shoppingItemRepository: ShoppingItemRepository,
  ) {}

  async getItemsByUserId(userId: number): Promise<ShoppingItemResponseDto[]> {
    const items = await this.shoppingItemRepository.findAllByUserId(userId);
    return items.map((item) => ({ ...item }));
  }

  async getItem(id: number): Promise<ShoppingItemResponseDto | null> {
    const item = await this.shoppingItemRepository.findById(id);
    return item ? { ...item } : null;
  }

  async createItem(
    dto: CreateShoppingItemRequestDto,
  ): Promise<ShoppingItemResponseDto> {
    const item = await this.shoppingItemRepository.create({
      name: dto.name,
      category: dto.category as Category,
      userId: dto.userId,
    });
    return { ...item };
  }

  async updateItem(
    id: number,
    dto: UpdateShoppingItemRequestDto,
  ): Promise<ShoppingItemResponseDto | null> {
    const item = await this.shoppingItemRepository.update(id, {
      name: dto.name,
      category: dto.category as Category,
    });
    return item ? { ...item } : null;
  }

  async deleteItem(id: number): Promise<void> {
    await this.shoppingItemRepository.softDelete(id);
  }
}
