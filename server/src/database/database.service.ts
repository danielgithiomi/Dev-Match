import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });

    super({
      adapter,
    });
  }

  onModuleInit(): any {
    this.$connect()
      .then(() => console.log('Connected to database.'))
      .catch((error) => console.error('Failed to connect to database.', error));
  }

  onModuleDestroy(): any {
    this.$disconnect()
      .then(() => console.log('Disconnected from database.'))
      .catch((error) =>
        console.error('Failed to disconnect from database.', error),
      );
  }
}
