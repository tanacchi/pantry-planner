import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { PantryDTO } from './pantry.dto';

@ApiTags('Pantry')
@Controller('pantries')
export class PantryController {
  @Get()
  @ApiOperation({ summary: 'パントリー一覧を取得します' })
  @ApiResponse({
    status: 200,
    description: 'パントリー一覧の取得に成功しました',
    type: [PantryDTO],
  })
  @ApiResponse({ status: 400, description: '不正なリクエストです' })
  @ApiResponse({ status: 500, description: 'サーバーエラー' })
  getAllPantries(): PantryDTO[] {
    // Logic to retrieve all pantries
    return [];
  }

  @Post()
  @ApiOperation({ summary: '新しいパントリーを作成します' })
  @ApiBody({ type: PantryDTO })
  @ApiResponse({
    status: 201,
    description: 'パントリーの作成に成功しました',
    type: PantryDTO,
  })
  @ApiResponse({ status: 400, description: '不正なリクエストです' })
  @ApiResponse({ status: 500, description: 'サーバーエラー' })
  createPantry(@Body() pantry: PantryDTO): PantryDTO {
    // Logic to create a new pantry
    // Logic to create a new pantry
    return { ...pantry, id: 1 }; // Example usage with initialized id
  }

  @Get(':id')
  @ApiOperation({ summary: '指定IDのパントリーを取得します' })
  @ApiParam({ name: 'id', description: 'パントリーID' })
  @ApiResponse({
    status: 200,
    description: 'パントリーの取得に成功しました',
    type: PantryDTO,
  })
  @ApiResponse({ status: 404, description: 'リソースが見つかりません' })
  @ApiResponse({ status: 400, description: '不正なリクエストです' })
  @ApiResponse({ status: 500, description: 'サーバーエラー' })
  getPantryById(@Param('id') id: number): PantryDTO {
    // Logic to retrieve a pantry by ID
    // Logic to retrieve detailed information about a pantry by ID
    return { id, userId: 1, createdAt: '', updatedAt: '', items: [] }; // Example usage with items
  }

  @Put(':id')
  @ApiOperation({ summary: '指定IDのパントリー情報を更新します' })
  @ApiParam({ name: 'id', description: 'パントリーID' })
  @ApiBody({ type: PantryDTO })
  @ApiResponse({
    status: 200,
    description: 'パントリーの更新に成功しました',
    type: PantryDTO,
  })
  @ApiResponse({ status: 404, description: 'リソースが見つかりません' })
  @ApiResponse({ status: 400, description: '不正なリクエストです' })
  @ApiResponse({ status: 500, description: 'サーバーエラー' })
  updatePantry(@Param('id') id: number, @Body() pantry: PantryDTO): PantryDTO {
    // Logic to update a pantry by ID
    // Logic to update a pantry by ID
    return { ...pantry, id }; // Example usage with id
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '指定IDのパントリーを削除します' })
  @ApiParam({ name: 'id', description: 'パントリーID' })
  @ApiResponse({ status: 204, description: 'パントリーの削除に成功しました' })
  @ApiResponse({ status: 404, description: 'リソースが見つかりません' })
  @ApiResponse({ status: 400, description: '不正なリクエストです' })
  @ApiResponse({ status: 500, description: 'サーバーエラー' })
  deletePantry(@Param('id') id: number): void {
    // Logic to delete a pantry by ID
  }

  @Get(':id/detail')
  @ApiOperation({ summary: '指定IDのパントリーの詳細を取得します' })
  @ApiParam({ name: 'id', description: 'パントリーID' })
  @ApiResponse({
    status: 200,
    description: 'パントリーの取得に成功しました',
    type: PantryDTO,
  })
  @ApiResponse({ status: 404, description: 'リソースが見つかりません' })
  @ApiResponse({ status: 400, description: '不正なリクエストです' })
  @ApiResponse({ status: 500, description: 'サーバーエラー' })
  getPantryDetailById(@Param('id') id: number): PantryDTO {
    // Logic to retrieve detailed information about a pantry by ID
    return { id, userId: 1, createdAt: '', updatedAt: '' }; // Example usage
  }

  @Get('by-user/:userId')
  @ApiOperation({ summary: 'ユーザーIDでパントリーを取得します' })
  @ApiParam({ name: 'userId', description: 'ユーザーID' })
  @ApiResponse({
    status: 200,
    description: 'パントリー一覧の取得に成功しました',
    type: [PantryDTO],
  })
  @ApiResponse({ status: 404, description: 'リソースが見つかりません' })
  @ApiResponse({ status: 400, description: '不正なリクエストです' })
  @ApiResponse({ status: 500, description: 'サーバーエラー' })
  getPantriesByUserId(@Param('userId') userId: number): PantryDTO[] {
    // Logic to retrieve pantries by user ID
    return [{ id: 1, userId, createdAt: '', updatedAt: '' }]; // Example usage
  }

  @Get('by-user/:userId/detail')
  @ApiOperation({ summary: 'ユーザーIDでパントリーの詳細を取得します' })
  @ApiParam({ name: 'userId', description: 'ユーザーID' })
  @ApiResponse({
    status: 200,
    description: 'パントリー一覧の取得に成功しました',
    type: [PantryDTO],
  })
  @ApiResponse({ status: 404, description: 'リソースが見つかりません' })
  @ApiResponse({ status: 400, description: '不正なリクエストです' })
  @ApiResponse({ status: 500, description: 'サーバーエラー' })
  getPantryDetailsByUserId(@Param('userId') userId: number): PantryDTO[] {
    // Logic to retrieve detailed information about pantries by user ID
    return [{ id: 1, userId, createdAt: '', updatedAt: '' }]; // Example usage
  }
}
