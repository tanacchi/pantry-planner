import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMessageRequestDto } from './dto';
import { MessageService } from './message.service';

@ApiTags('Message')
@Controller('/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiBody({ type: CreateMessageRequestDto })
  @ApiResponse({
    status: 201,
    description: 'パントリーの作成に成功しました',
  })
  @ApiResponse({ status: 400, description: '不正なリクエスト' })
  @ApiResponse({ status: 500, description: 'サーバーエラー' })
  createMessage(@Body() dto: CreateMessageRequestDto): Promise<void> {
    return this.messageService.send(dto);
  }
}
