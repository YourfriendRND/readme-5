import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaClientService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: process.env['NODE_ENV'] === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });
  }

  async onModuleInit (): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy (): Promise<void> {
    await this.$disconnect();
  }

}
