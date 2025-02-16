import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    //PrismaClient.$connect(), т.к. this extends PrismaClient
    await this.$connect();
  }
}
