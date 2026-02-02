import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { GlobalResponseInterceptor } from '@shared/interceptors';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: GlobalResponseInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
