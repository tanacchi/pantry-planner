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
  ParseArrayPipe,
  ParseBoolPipe,
  DefaultValuePipe,
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
  @ApiQuery({
    name: 'include_consumed',
    required: false,
    isArray: false,
    type: Boolean,
    description: '削除されたアイテムを含めるかどうか',
  })
  @ApiResponse({
    status: 200,
    description: 'アイテム一覧の取得に成功しました',
    type: [ItemResponseDto],
  })
  getItems(
    @Query('include_consumed', new DefaultValuePipe(false), ParseBoolPipe)
    includeConsumed: boolean,
    @Query('name', new DefaultValuePipe([]), ParseArrayPipe) name: string[],
    @Query('category', new DefaultValuePipe([]), ParseArrayPipe)
    category: string[],
  ): Promise<ItemResponseDto[]> {
    return this.itemService.getItems({
      name,
      category,
      includeConsumed,
    });
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
  @ApiQuery({
    name: 'include_consumed',
    required: false,
    type: Boolean,
    description: '削除されたアイテムを含めるかどうか',
  })
  @ApiResponse({
    status: 200,
    description: 'アイテム一覧の取得に成功しました',
    type: [ItemResponseDto],
  })
  getItemsByPantry(
    @Param('pantryId', ParseIntPipe) pantryId: number,
    @Query('include_consumed', new DefaultValuePipe(false), ParseBoolPipe)
    includeConsumed?: boolean,
  ): Promise<ItemResponseDto[]> {
    return this.itemService.getItemsByPantry(pantryId, includeConsumed);
  }
}
