import { messagingApi } from "@line/bot-sdk";
import { Injectable } from "@nestjs/common";
const { MessagingApiClient } = messagingApi;

@Injectable()
export class MessageRepository {
  private readonly client = new MessagingApiClient({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN ?? "",
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  async send(lineUid: string, message: string): Promise<void> {
    console.log(`send message: ${lineUid} -> ${message}`);
    // const result = await this.client.pushMessage({
    //   to: lineUid,
    //   messages: [{ type: 'text', text: message }],
    // });
    // console.log('send message result: ', JSON.stringify(result, null, 2));
    return;
  }
}
