import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageRepository {
  async send(id: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Message sent to message with ID: ${id}`);
        resolve();
      }, 1000);
    });
  }
}
