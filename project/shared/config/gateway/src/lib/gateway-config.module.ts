import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import gatewayConfig from './gateway.config';

const GATEWAY_ENV_FILE_PATH = './apps/gateway/gateway.env';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [gatewayConfig],
            envFilePath: GATEWAY_ENV_FILE_PATH,
        })
    ],
    exports: [],
})
export class GatewayConfigModule {}