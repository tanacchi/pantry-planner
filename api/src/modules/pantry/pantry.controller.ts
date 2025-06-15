import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import type { PantryService } from "./application/pantry.service";
import { CreatePantryRequestDto } from "./dto/pantry-request.dto";
import { PantryResponseDto } from "./dto/pantry-response.dto";
import { PantryDetailResponseDto } from "./dto/pantry-response.dto";

@ApiTags("Pantry")
@Controller("/pantries")
export class PantryController {
  constructor(private readonly pantryService: PantryService) {}

  @Post()
  @ApiBody({ type: CreatePantryRequestDto })
  @ApiResponse({
    status: 201,
    description: "パントリーの作成に成功しました",
    type: PantryResponseDto,
  })
  @ApiResponse({ status: 400, description: "不正なリクエスト" })
  @ApiResponse({ status: 500, description: "サーバーエラー" })
  createPantry(@Body() dto: CreatePantryRequestDto): Promise<PantryResponseDto> {
    return this.pantryService.createPantry(dto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: "パントリー一覧の取得に成功しました",
    type: [PantryResponseDto],
  })
  getPantries(): Promise<PantryResponseDto[]> {
    return this.pantryService.getPantries();
  }

  @Get("/:id")
  @ApiParam({ name: "id", type: Number, description: "パントリーID" })
  @ApiResponse({
    status: 200,
    description: "パントリーの取得に成功しました",
    type: PantryResponseDto,
  })
  @ApiResponse({ status: 404, description: "リソースが見つかりません" })
  getPantry(@Param("id", ParseIntPipe) id: number): Promise<PantryResponseDto> {
    return this.pantryService.getPantry(id);
  }

  @Get("/:id/detail")
  @ApiParam({ name: "id", type: Number, description: "パントリーID" })
  @ApiResponse({
    status: 200,
    description: "パントリー詳細の取得に成功しました",
    type: PantryDetailResponseDto,
  })
  getPantryDetail(@Param("id", ParseIntPipe) id: number): Promise<PantryDetailResponseDto> {
    return this.pantryService.getPantryDetail(id);
  }

  @Get("/by-user/:userId")
  @ApiParam({ name: "userId", type: Number, description: "ユーザーID" })
  @ApiResponse({
    status: 200,
    description: "ユーザーに紐づくパントリー一覧の取得に成功しました",
    type: [PantryResponseDto],
  })
  getPantriesByUser(@Param("userId", ParseIntPipe) userId: number): Promise<PantryResponseDto[]> {
    return this.pantryService.getPantriesByUser(userId);
  }

  @Get("/by-user/:userId/detail")
  @ApiParam({ name: "userId", type: Number, description: "ユーザーID" })
  @ApiResponse({
    status: 200,
    description: "ユーザーに紐づくパントリー詳細の取得に成功しました",
    type: [PantryDetailResponseDto],
  })
  getPantryDetailsByUser(
    @Param("userId", ParseIntPipe) userId: number,
  ): Promise<PantryDetailResponseDto[]> {
    return this.pantryService.getPantryDetailsByUser(userId);
  }

  @Put("/:id")
  @ApiParam({ name: "id", type: Number, description: "パントリーID" })
  @ApiBody({ type: CreatePantryRequestDto })
  @ApiResponse({
    status: 200,
    description: "パントリーの更新に成功しました",
    type: PantryResponseDto,
  })
  updatePantry(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: CreatePantryRequestDto,
  ): Promise<PantryResponseDto> {
    return this.pantryService.updatePantry(id, dto);
  }

  @Delete("/:id")
  @ApiParam({ name: "id", type: Number, description: "パントリーID" })
  @ApiResponse({ status: 204, description: "パントリーの削除に成功しました" })
  @HttpCode(204)
  deletePantry(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.pantryService.deletePantry(id);
  }
}
