import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShoppingItemService } from './application/shopping-item.service';
import {
  CreateShoppingItemRequestDto,
  UpdateShoppingItemRequestDto,
} from './dto/shopping-item-request.dto';
import { ShoppingItemResponseDto } from './dto/shopping-item-response.dto';

@ApiTags('ShoppingItem')
@Controller('shopping-list/items')
export class ShoppingItemController {
  constructor(private readonly shoppingItemService: ShoppingItemService) {}

  @Get()
  @ApiResponse({ status: 200, type: [ShoppingItemResponseDto] })
  getItems(
    @Query('userId', ParseIntPipe) userId: number,
  ): Promise<ShoppingItemResponseDto[]> {
    return this.shoppingItemService.getItemsByUserId(userId);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: ShoppingItemResponseDto })
  getItem(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ShoppingItemResponseDto | null> {
    return this.shoppingItemService.getItem(id);
  }

  @Post()
  @ApiBody({ type: CreateShoppingItemRequestDto })
  @ApiResponse({ status: 201, type: ShoppingItemResponseDto })
  createItem(
    @Body() dto: CreateShoppingItemRequestDto,
  ): Promise<ShoppingItemResponseDto> {
    return this.shoppingItemService.createItem(dto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateShoppingItemRequestDto })
  @ApiResponse({ status: 200, type: ShoppingItemResponseDto })
  updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateShoppingItemRequestDto,
  ): Promise<ShoppingItemResponseDto | null> {
    return this.shoppingItemService.updateItem(id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  async deleteItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.shoppingItemService.deleteItem(id);
  }
}
