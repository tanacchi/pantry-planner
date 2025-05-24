import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  enableShutdownHooks(app: INestApplication) {
    // @ts-expect-error やっつけ
    this.$on('beforeExit', () => {
      void app.close();
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
