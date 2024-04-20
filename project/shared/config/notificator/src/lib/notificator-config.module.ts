import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_NOTIFICATOR_FILE_PATH } from '@project/shared/constants';
import notificatorConfig from './notificator.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [notificatorConfig],
            envFilePath: ENV_NOTIFICATOR_FILE_PATH,
        })
    ]
})
export class NotificatorConfigModule {}