import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import fileLoaderConfig from './file-loader.config';

const ENV_FILE_LOADER_PATH = 'apps/file-loader/file-loader.env';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [fileLoaderConfig],
            envFilePath: ENV_FILE_LOADER_PATH,
        })
    ],
    exports: [],
})
export class FileLoaderConfigModule {}
