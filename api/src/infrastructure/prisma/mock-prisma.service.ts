/* eslint-disable @typescript-eslint/require-await */
import { Injectable, INestApplication, OnModuleInit } from '@nestjs/common';
import { MockUserStore } from './mock-user.store';
import { MockPantryStore } from './mock-pantry.store';
import { MockItemStore } from './mock-item.store';
import { MockShoppingItemStore } from './mock-shopping-item.store';

@Injectable()
export class MockPrismaService implements OnModuleInit {
  user = new MockUserStore();
  pantry = new MockPantryStore();
  item = new MockItemStore();
  shoppingItem = new MockShoppingItemStore();
  private beforeExitHandlers: Array<() => void> = [];

  async $connect() {
    /* no-op */
  }
  async $disconnect() {
    /* no-op */
  }
  $on(event: string, cb: (...args: any[]) => void) {
    if (event === 'beforeExit') this.beforeExitHandlers.push(cb);
  }
  enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', () => {
      void app.close();
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
