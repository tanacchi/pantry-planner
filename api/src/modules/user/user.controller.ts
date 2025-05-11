import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from './application/user.service';
import { CreateUserRequestDto } from './dto/user-request.dto';
import {
  UserDetailResponseDto,
  UserResponseDto,
} from './dto/user-response.dto';

@ApiTags('User')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserRequestDto })
  @ApiResponse({
    status: 201,
    description: 'ユーザーの作成に成功しました',
    type: UserDetailResponseDto,
  })
  @ApiResponse({ status: 400, description: '不正なリクエスト' })
  @ApiResponse({ status: 500, description: 'サーバーエラー' })
  createUser(
    @Body() dto: CreateUserRequestDto,
  ): Promise<UserDetailResponseDto> {
    return this.userService.createUser(dto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'ユーザー一覧の取得に成功しました',
    type: [UserResponseDto],
  })
  getUsers(): Promise<UserResponseDto[]> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  @ApiParam({ name: 'id', type: Number, description: 'ユーザーID' })
  @ApiResponse({
    status: 200,
    description: 'ユーザーの取得に成功しました',
    type: UserResponseDto,
  })
  getUser(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
    return this.userService.getUser(id);
  }

  @Get('/:id/detail')
  @ApiParam({ name: 'id', type: Number, description: 'ユーザーID' })
  @ApiResponse({
    status: 200,
    description: 'ユーザー詳細の取得に成功しました',
    type: UserDetailResponseDto,
  })
  getUserDetail(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserDetailResponseDto> {
    return this.userService.getUserDetail(id);
  }

  @Get('/by-line-uid/:lineUid')
  @ApiParam({ name: 'lineUid', type: String, description: 'LINE UID' })
  @ApiResponse({
    status: 200,
    description: 'LINE UID によるユーザー取得に成功しました',
    type: UserResponseDto,
  })
  getUserByLineUid(
    @Param('lineUid') lineUid: string,
  ): Promise<UserResponseDto> {
    return this.userService.getUserByLineUid(lineUid);
  }

  @Get('/by-line-uid/:lineUid/detail')
  @ApiParam({ name: 'lineUid', type: String, description: 'LINE UID' })
  @ApiResponse({
    status: 200,
    description: 'LINE UID によるユーザー詳細取得に成功しました',
    type: UserDetailResponseDto,
  })
  getUserDetailByLineUid(
    @Param('lineUid') lineUid: string,
  ): Promise<UserDetailResponseDto> {
    return this.userService.getUserDetailByLineUid(lineUid);
  }

  @Put('/:id')
  @ApiParam({ name: 'id', type: Number, description: 'ユーザーID' })
  @ApiBody({ type: CreateUserRequestDto })
  @ApiResponse({
    status: 200,
    description: 'ユーザーの更新に成功しました',
    type: UserResponseDto,
  })
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateUser(id, dto);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', type: Number, description: 'ユーザーID' })
  @ApiResponse({ status: 204, description: 'ユーザーの削除に成功しました' })
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
