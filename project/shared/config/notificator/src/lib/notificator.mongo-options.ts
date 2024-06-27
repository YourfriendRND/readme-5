import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { getMongoConnectionString } from '@project/shared/helpers';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
    return {
        useFactory: async (config: ConfigService) => {
            return {
                uri: getMongoConnectionString({
                    username: config.get<string>('application.db.user')!,
                    password: config.get<string>('application.db.password')!,
                    host: config.get<string>('application.db.host')!,
                    port: config.get<number>('application.db.port')!,
                    authDataBase: config.get<string>('application.db.authBase')!,
                    dbName: config.get<string>('application.db.name')!,
                })
            }
        },
        inject: [ConfigService]
    }
}
