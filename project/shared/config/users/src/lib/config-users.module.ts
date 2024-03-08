import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_USERS_FILE_PATH } from '@project/shared/constants';
import appConfig from './app.config';
import mongoConfig from './mongo.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [appConfig, mongoConfig],
            envFilePath: ENV_USERS_FILE_PATH
        })
    ]
})

export class ConfigUsersModule {}
