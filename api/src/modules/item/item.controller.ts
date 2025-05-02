import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemService } from './application/item.service';
import { CreateItemRequestDto } from './dto/item-request.dto';
import { ItemResponseDto } from './dto/item-response.dto';

@ApiTags('items')
@Controller('/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiBody({
    type: CreateItemRequestDto,
  })
  @ApiResponse({
    status: 201,
    description: 'アイテムが作成されました',
    type: ItemResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'リクエストが不正です',
  })
  @ApiResponse({
    status: 500,
    description: 'サーバーエラー',
  })
  createItem(
    @Body() createItemRequestDto: CreateItemRequestDto,
  ): ItemResponseDto {
    const item = this.itemService.createItem(createItemRequestDto);
    return item;
  }
}
