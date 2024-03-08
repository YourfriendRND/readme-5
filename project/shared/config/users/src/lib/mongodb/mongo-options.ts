import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoConnectionString } from '@project/shared/helpers';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
    return {
        useFactory: async function (config: ConfigService) { 
            return {
                uri: getMongoConnectionString({
                    username: config.get<string>('mongodb.userName')!,
                    password: config.get<string>('mongodb.password')!,
                    host: config.get<string>('mongodb.host')!,
                    dbName: config.get<string>('mongodb.dbName')!,
                    port: config.get<number>('mongodb.port')!,
                    authDataBase: config.get<string>('mongodb.authBase')!
                }),
            }
        },
        inject: [ConfigService]
    }
}