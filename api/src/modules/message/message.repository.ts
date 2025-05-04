import { Injectable } from '@nestjs/common';
import line from '@line/bot-sdk';

@Injectable()
export class MessageRepository {
  private readonly client: line.messagingApi.MessagingApiClient;

  constructor() {
    this.client = new line.messagingApi.MessagingApiClient({
      channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN ?? '',
    });
  }

  async send(lineUid: string): Promise<void> {
    console.log('send message: ', lineUid);
    // await this.client.pushMessage({
    //   to: lineUid,
    //   messages: [{ type: 'text', text: 'hello, world' }],
    // });
    return;
  }
}
