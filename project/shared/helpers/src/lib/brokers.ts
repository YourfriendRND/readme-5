import { ConfigService } from '@nestjs/config';
import { getRabbitMQConnectionString } from './common';

export function getRabbitMQOptions (optionSpace: string) {
    return {
        useFactory: async (config: ConfigService) => ({
            exchanges: [
                {
                    name: config.get<string>(`${optionSpace}.queue`),
                    type: 'direct',
                }
            ],
            uri: getRabbitMQConnectionString({
                user: config.get<string>(`${optionSpace}.user`),
                password: config.get<string>(`${optionSpace}.password`),
                host: config.get<string>(`${optionSpace}.host`),
                port: config.get<number>(`${optionSpace}.port`),
            })
        }),
        inject: [ConfigService]
    }
}