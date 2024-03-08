import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionString } from '@project/shared/helpers';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
    return {
        useFactory: async function (config: ConfigService) { 
            return {
                uri: getMongoConnectionString({
                    username: config.get<string>('application.db.user')!,
                    password: config.get<string>('application.db.password')!,
                    host: config.get<string>('application.db.host')!,
                    dbName: config.get<string>('application.db.name')!,
                    port: config.get<number>('application.db.port')!,
                    authDataBase: config.get<string>('application.db.authBase')!
                }),
            }
        },
        inject: [ConfigService]
    }
}