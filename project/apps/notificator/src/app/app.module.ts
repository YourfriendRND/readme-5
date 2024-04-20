import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificatorConfigModule } from '@project/shared/config/notificator';

@Module({
  imports: [
    NotificatorConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
