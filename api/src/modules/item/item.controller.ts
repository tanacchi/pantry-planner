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
} from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ItemService } from './application/item.service';
import { CreateItemRequestDto } from './dto/item-request.dto';
import { ItemResponseDto } from './dto/item-response.dto';

@ApiTags('Item')
@Controller('/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiBody({ type: CreateItemRequestDto })
  @ApiResponse({
    status: 201,
    description: 'アイテムの作成に成功しました',
    type: ItemResponseDto,
  })
  @ApiResponse({ status: 400, description: '不正なリクエスト' })
  @ApiResponse({ status: 500, description: 'サーバーエラー' })
  createItem(
    @Body() createItemRequestDto: CreateItemRequestDto,
  ): Promise<ItemResponseDto> {
    return this.itemService.createItem(createItemRequestDto);
  }

  @Get()
  @ApiQuery({ name: 'name', required: false, isArray: true, type: String })
  @ApiQuery({ name: 'category', required: false, isArray: true, type: String })
  @ApiResponse({
    status: 200,
    description: 'アイテム一覧の取得に成功しました',
    type: [ItemResponseDto],
  })
  getItems(
    @Query('name') name?: string[],
    @Query('category') category?: string[],
  ): Promise<ItemResponseDto[]> {
    return this.itemService.getItems({ name, category });
  }

  @Get('/:id')
  @ApiParam({ name: 'id', type: Number, description: 'アイテムID' })
  @ApiResponse({
    status: 200,
    description: 'アイテムの取得に成功しました',
    type: ItemResponseDto,
  })
  @ApiResponse({ status: 404, description: 'リソースが見つかりません' })
  getItem(@Param('id', ParseIntPipe) id: number): Promise<ItemResponseDto> {
    return this.itemService.getItem(id);
  }

  @Put('/:id')
  @ApiParam({ name: 'id', type: Number, description: 'アイテムID' })
  @ApiBody({ type: CreateItemRequestDto })
  @ApiResponse({
    status: 200,
    description: 'アイテムの更新に成功しました',
    type: ItemResponseDto,
  })
  updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: CreateItemRequestDto,
  ): Promise<ItemResponseDto> {
    return this.itemService.updateItem(id, updateDto);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', type: Number, description: 'アイテムID' })
  @ApiResponse({ status: 204, description: 'アイテムの削除に成功しました' })
  deleteItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.itemService.deleteItem(id);
  }

  @Get('/by-pantry/:pantryId')
  @ApiParam({ name: 'pantryId', type: Number, description: 'パントリーID' })
  @ApiResponse({
    status: 200,
    description: 'アイテム一覧の取得に成功しました',
    type: [ItemResponseDto],
  })
  getItemsByPantry(
    @Param('pantryId', ParseIntPipe) pantryId: number,
  ): Promise<ItemResponseDto[]> {
    return this.itemService.getItemsByPantry(pantryId);
  }
}
